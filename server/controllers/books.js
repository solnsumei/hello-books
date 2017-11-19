import models from '../models/index';
import { formatBookObject } from '../helpers/formatData';
import errorResponseHandler from '../helpers/errorResponseHandler';

/**
 * Controller for adding, updating and getting books
 * @exports {Object} booksController
 */

let attributes = ['id', 'title', 'categoryId', 'author', 'description', 'coverPic', 'isDeleted', 'stockQuantity',
  'borrowedQuantity'];

const include = [{ model: models.Category, as: 'category', attributes: ['name', 'slug'] }];

export default {
  /**
   * Method create book in the library
   * @param {Object} req
   * @param {Object} res
   *
   * @return {Bluebird<Object> | Promise.<Object>} res
   */
  create(req, res) {
    const { title, categoryId, author, description, coverPic, stockQuantity } = req.body;
    return models.Book
      .create({
        title,
        categoryId,
        author,
        description,
        coverPic,
        stockQuantity,
      })
      .then(book => res.status(201).send({
        success: true,
        message: 'Book added successfully',
        book: formatBookObject(book, req.category)
      }))
      .catch(error => errorResponseHandler(res, null, null, error));
  },

  /**
   * Method to get all books from the library
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Promise.<Object>} books
   */
  getAllBooks(req, res) {
    if (req.auth.admin) {
      attributes = [...attributes,
        'isBorrowed',
        'createdAt'
      ];
    }

    return models.Book
      .scope('active')
      .findAll({
        attributes,
        include
      })
      .then(books => res.status(200).send({
        success: true,
        message: 'Books loaded successfully',
        books
      }))
      .catch(() => errorResponseHandler(res));
  },

  /**
   * [getBook description]
   * @method getBook
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getBook(req, res) {
    if (req.auth.admin) {
      attributes = [...attributes,
        'isBorrowed',
        'createdAt'
      ];
    }

    if (!parseInt(req.params.bookId, 10)) {
      return errorResponseHandler(res, 'Book id is invalid', 400);
    }

    return models.Book
      .findOne({
        attributes,
        include,
        where: { id: req.params.bookId }
      })
      .then((book) => {
        if (!book) {
          return errorResponseHandler(res, 'Book not found', 404);
        }
        return res.status(200).send({
          success: true,
          message: 'Book loaded successfully',
          book
        });
      })
      .catch(() => errorResponseHandler(res));
  },

  /**
   * This updates the book in the library
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} book
   */
  update(req, res) {
    if (!parseInt(req.params.bookId, 10)) {
      return errorResponseHandler(res, 'Book id is invalid', 400);
    }
    return models.Book
      .findOne({
        include: [{
          model: models.Category,
          as: 'category',
          attributes: ['name', 'slug']
        }],
        where: { id: req.params.bookId }
      })
      .then((book) => {
        if (!book) {
          return errorResponseHandler(res, 'Book not found', 404);
        }
        book.update({
          title: req.body.title || book.title,
          categoryId: req.body.categoryId || book.categoryId,
          author: req.body.author || book.author,
          description: req.body.description || book.description,
          coverPic: req.body.coverPic || book.coverPic,
        }).then((result) => {
          if (result) {
            return res.status(200).send({
              success: true,
              message: 'Book updated successfully',
              book: formatBookObject(book, book.category)
            });
          }
        })
          .catch(error => errorResponseHandler(res, null, null, error));
      });
  },

  addQuantity(req, res) {
    req.book.update({
      stockQuantity: req.book.stockQuantity + parseInt(req.body.quantity, 10)
    }).then((result) => {
      if (result) {
        return res.status(200).send({
          success: true,
          message: 'Stock quantity updated successfully',
          data: {
            id: req.book.id,
            title: req.book.title,
            stockQuantity: req.book.stockQuantity }
        });
      }
    })
      .catch(() => errorResponseHandler(res, 'Stock quantity could not be updated, please try again later.', 500));
  },

  delete(req, res) {
    if (req.book.isBorrowed) {
      return errorResponseHandler(res, 'Book is borrowed and cannot be deleted at this time', 400);
    }

    return req.book.update({
      isDeleted: true
    }).then((result) => {
      if (result) {
        return res.status(200).send({
          success: true,
          message: 'Book has been deleted successfully',
          data: { deletedBookId: req.book.id }
        });
      }
    })
      .catch(() => errorResponseHandler(res, 'Book could not be deleted at this time, please try again later.', 500));
  }
};

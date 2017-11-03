import db from '../models/index';
import { formatBookObject } from '../helpers/formatData';
import errorResponseHandler from '../helpers/errorResponseHandler';

/**
 * Controller for adding, updating and getting books
 * @exports {Object} booksController
 */

let attributes = ['id', 'title', 'categoryId', 'author', 'description', 'coverPic', 'isDeleted', 'stockQuantity',
  'borrowedQuantity'];

export default {
  /**
   * This creates book in the library
   * @param {Object} req
   * @param {Object} res
   *
   * @return {Bluebird<Object> | Promise.<Object>} res
   */
  create(req, res) {
    const { title, categoryId, author, description, coverPic, stockQuantity } = req.body;
    return db.Book
      .create({
        title,
        categoryId,
        author,
        description,
        coverPic,
        stockQuantity,
      })
      .then(book => res.status(201).send({
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

    return db.Book
      .scope('active')
      .findAll({
        attributes,
        include: [{
          model: db.Category,
          attributes: ['name', 'slug']
        }]
      })
      .then(books => res.status(200).send({ books }))
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
      return errorResponseHandler(res, 'Book Id is invalid', 400);
    }

    return db.Book
      .findOne({
        attributes,
        include: [{
          model: db.Category,
          attributes: ['name', 'slug'],
        }],
        where: { id: req.params.bookId }
      })
      .then((book) => {
        if (!book) {
          return errorResponseHandler(res, 'Book not found', 404);
        }

        return res.status(200).send({ book });
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
    return db.Book
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return errorResponseHandler(res, 'Book not found', 404);
        }
        book.update({
          title: req.body.title,
          categoryId: req.body.categoryId,
          author: req.body.author,
          description: req.body.description,
          coverPic: req.body.coverPic,
        }).then((result) => {
          if (result) {
            return res.status(200).send({
              message: 'Book updated successfully',
              book: formatBookObject(book, req.category)
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
          book: {
            id: req.book.id,
          }
        });
      }
    })
      .catch(() => errorResponseHandler(res, 'Book could not be deleted at this time, please try again later.', 500));
  }
};

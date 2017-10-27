import db from '../models/index';
import { formatBookObject } from '../helpers/formatData';
/**
 * Controller for adding, updating and get all books
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
    return db.Book
      .create({
        title: req.body.title,
        categoryId: req.body.categoryId,
        author: req.body.author,
        description: req.body.description,
        coverPic: req.body.coverPic,
        stockQuantity: req.body.stockQuantity,
      })
      .then(book => res.status(201).send({
        book: formatBookObject(book, req.category)
      }))
      .catch((error) => {
        if (error.name === 'SequelizeValidationError' ||
          error.name === 'SequelizeUniqueConstraintError') {
          const errors = {};
          error.errors.forEach((err) => {
            errors[err.path] = err.message;
          });
          return res.status(400).send({ errors });
        }

        return res.status(500).send({
          error
        });
      }
      );
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
        }],
      })
      .then(books => res.status(200).send({ books }))
      .catch(() => res.status(500).send({
        error: 'Request could not be processed, please try again later'
      }));
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

    if (!req.params.bookId || !Number.isInteger(parseInt(req.params.bookId, 10))) {
      return res.status(400).send({ error: 'Book Id is invalid' });
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
          return res.status(404).send({ error: 'Book not found' });
        }

        return res.status(200).send({ book });
      })
      .catch(() => res.status(500).send({
        error: 'Request could not be processed, please try again later'
      }));
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
          return res.status(404).send({ error: 'Book not found' });
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
              book: formatBookObject(book, req.category)
            });
          }
        })
          .catch((error) => {
            if (error.name === 'SequelizeValidationError' ||
              error.name === 'SequelizeUniqueConstraintError') {
              const errors = {};
              error.errors.forEach((err) => {
                errors[err.path] = err.message;
              });
              return res.status(400).send({ errors });
            }

            return res.status(500).send({
              error: 'Request could not be processed, please try again later'
            });
          });
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
      .catch(() => res.status(500).send({
        error: 'Stock quantity could not be updated, please try again later.'
      }));
  },

  delete(req, res) {
    if (req.book.isBorrowed) {
      return res.status(400).send({
        error: 'Book is borrowed and cannot be deleted at this time'
      });
    }

    req.book.update({
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
      .catch(() => res.status(500).send({
        error: 'Book could not be deleted at this time, please try again later.'
      }));
  }
};

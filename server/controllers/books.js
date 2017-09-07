import db from '../models/index';

/**
 * Controller for adding, updating and get all books
 * @exports {Object} booksController
 */
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
      .then(book => res.status(201).send(book))
      .catch((error) => {
        if (error.name === 'SequelizeValidationError' ||
          error.name === 'SequelizeUniqueConstraintError') {
          const errors = {};
          error.errors.forEach((err) => {
            errors[err.path] = err.message;
          });
          if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send({ errors });
          }
          return res.status(400).send({ errors });
        }

        return res.status(500).send({
          error: 'Request could not be processed, please try again later'
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
    let attributes = ['id', 'title', 'categoryId', 'author', 'description', 'coverPic'];

    if (req.auth.admin) {
      attributes = [...attributes,
        'stockQuantity',
        'borrowedQuantity',
        'isDeleted'
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
      .then(books => res.status(200).send(books))
      .catch((error) => {
        if (error) {
          return res.status(500).send({
            error: 'Request could not be processed, please try again later'
          });
        }
      });
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
      .scope('active')
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
          coverPic: req.body.coverPic
        }).then((result) => {
          if (result) {
            return res.status(200).send(book);
          }
        })
          .catch((error) => {
            if (error.name === 'SequelizeValidationError' ||
              error.name === 'SequelizeUniqueConstraintError') {
              const errors = {};
              for (let err of error.errors) {
                errors[err.path] = err.message;
              }

              if(error.name === 'SequelizeUniqueConstraintError'){
                return res.status(409).send({errors});
              }
              return res.status(400).send({errors});
            }

            return res.status(500).send({
              error: 'Request could not be processed, please try again later'
            });

          });
      });
  },

  addQuantity(req, res){
    req.book.update({
      stockQuantity: req.book.stockQuantity + Number.parseInt(req.body.quantity)
    }).then(result => {
      if(result){
        return res.status(200).send({
          success: true,
          message: 'Stock quantity updated successfully'
        });
      }
    })
      .catch(error => res.status(500).send({
        error: 'Stock quantity could not be updated, please try again later.'
      }));
  },

  delete(req, res){
    req.book.update({
      isDeleted: true
    }).then(result => {
      if(result){
        return res.status(200).send({
          success: true,
          message: 'Book has been deleted successfully'
        });
      }
    })
      .catch(error => res.status(500).send({
        error: 'Book could not be deleted at this time, please try again later.'
      }));
  }
};

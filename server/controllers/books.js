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
        author: req.body.author,
        description: req.body.description,
        coverPic: req.body.coverPic,
        stockQuantity: req.body.stockQuantity,
      })
      .then(book => res.status(201).send(book))
      .catch(error => {
        if(error.name === 'SequelizeValidationError' ||
          error.name === 'SequelizeUniqueConstraintError'){
          const errors = {};
          for (let err of error.errors){
            errors[err.path] = err.message;
          }

          if(error.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).send({errors});
          }
          return res.status(400).send({errors});
        }

        return res.status(503).send({
          error: 'Request could not be processed, please try again later'
        });

      });
  },

  /**
   * Method to get all books from the library
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Promise.<Object>} books
   */
  getAllBooks(req, res) {

    let attributes = ['id', 'title', 'author', 'description', 'coverPic'];

    if(req.auth.user.admin){
      attributes = [
        'id',
        'title',
        'author',
        'description',
        'coverPic',
        'stockQuantity',
        'borrowedQuantity'];
    }

    return db.Book
      .scope('active')
      .findAll({
        attributes: attributes
      })
      .then(books => res.status(200).send(books))
      .catch(error => {
        if(error){
          return res.status(503).send({
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
    if (req.params.bookId === undefined || req.params.bookId === null) {
      return res.status(400).send({ error: 'Please provide a valid book id' });
    }

    req.checkParams('bookId', 'BookId is invalid').isNumeric();

    req.getValidationResult()
      .then((result) => {
        if (!result.isEmpty()) {
          return res.status(400).send(result.array());
        }
      });

    return db.Book
      .scope('active')
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({ error: 'Book not found' });
        }
        book.update({
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          coverPic: req.body.coverPic
        }).then((result) => {
          if (result) {
            return res.status(200).send(book);
          }
        })
          .catch(error => {
            if(error.name === 'SequelizeValidationError' ||
              error.name === 'SequelizeUniqueConstraintError'){
              const errors = {};
              for (let err of error.errors){
                errors[err.path] = err.message;
              }

              if(error.name === 'SequelizeUniqueConstraintError'){
                return res.status(409).send({errors});
              }
              return res.status(400).send({errors});
            }

            return res.status(503).send({
              error: 'Request could not be processed, please try again later'
            });

          });
      });
  },
};

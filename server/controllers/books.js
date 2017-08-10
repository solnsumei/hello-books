import db from '../models';

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
      .catch(error => res.status(400).send(error.errors));
  },

  /**
   * Method to get all books from the library
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Promise.<Object>} books
   */
  index(req, res) {
    return db.Book
      .scope('active')
      .findAll({
        attributes: ['id', 'title', 'author', 'description', 'coverPic']
      })
      .then(books => res.status(200).send({ message: 'Books Catalog', books }))
      .catch(error => res.status(400).send(error));
  },

  /**
   * This updates the book in the library
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} book
   */
  update(req, res) {
    if (req.params.bookId === null) {
      return res.status(400).send({ error: 'Book id cannot be null' });
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
          if (Number.parseInt(result) === 1) {
            return res.status(200).send(book);
          }
          return res.status(400).send({ error: 'Book could not be updated at this time' });
        })
          .catch(error => res.status(400).send(error.errors));
      });
  },
};

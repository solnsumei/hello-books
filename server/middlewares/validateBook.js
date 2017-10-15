import db from '../models/index';

/**
 * Middleware to check book availability inn the library
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function validateBook(req, res, next) {
  if (req.body.bookId === undefined || req.body.bookId === null ||
    !Number.isInteger(parseInt(req.body.bookId, 10))) {
    return res.status(400).send({ error: 'a valid book id is required' });
  }

  return db.Book.scope('active').findById(req.body.bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ error: 'Book not found' });
      }
      req.book = book;
      next();
    });
}

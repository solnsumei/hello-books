import db from '../models/index';

/**
 * Middleware to check book availability inn the library
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function checkBook(req, res, next) {
  if (req.params.bookId === undefined || req.params.bookId === null ||
    !Number.isInteger(Number.parseInt(req.params.bookId, 10))) {
    return res.status(400).send({ error: 'Please provide a valid book id' });
  }

  if (req.body.quantity === undefined || req.body.quantity === null) {
    return res.status(400).send({ error: 'Quantity is required' });
  }

  if (!Number.isInteger(Number.parseInt(req.body.quantity, 10)) ||
   Number.parseInt(req.body.quantity, 10) < 1) {
    return res.status(400).send({ error: 'Quantity must be a number not less than 1' });
  }

  return db.Book.scope('active').findById(req.params.bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ error: 'Book not found' });
      }

      req.book = book;
      next();
    });
}

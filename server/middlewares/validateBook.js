import models from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';

/**
 * Middleware to check if book is available
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function validateBook(req, res, next) {
  let bookId = null;
  if (req.url === '/book/borrow' || req.url === '/book/return') {
    bookId = req.body.bookId;
  } else {
    bookId = req.params.bookId;
  }

  if (!parseInt(bookId, 10)) {
    return errorResponseHandler(res, 'Book id is invalid', 400);
  }

  return models.Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return errorResponseHandler(res, 'Book not found', 404);
      }
      req.book = book;
      next();
    });
}

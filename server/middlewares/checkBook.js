import db from '../models/index';
import findBookById from '../helpers/findBookById';

/**
 * Middleware to check book availability inn the library
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function checkBook(req, res, next) {
  if (!parseInt(req.body.quantity, 10) || parseInt(req.body.quantity, 10) < 1) {
    return res.status(400).send({ error: 'Quantity must be a number not less than 1' });
  }

  return findBookById(req, res, next, req.params.bookId);
}

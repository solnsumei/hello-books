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
export default function validateBook(req, res, next) {
  return findBookById(req, res, next, req.body.bookId);
}

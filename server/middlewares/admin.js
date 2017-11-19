import errorResponseHandler from '../helpers/errorResponseHandler';

/**
 * Middleware to check admins
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function adminMiddleware(req, res, next) {
  if (!req.auth.admin) {
    return errorResponseHandler(res, 'Forbidden, admins only', 403);
  }

  next();
}

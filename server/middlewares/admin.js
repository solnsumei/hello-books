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
    return res.status(403).send({ error: 'Forbidden, Admins Only' });
  }
  next();
}

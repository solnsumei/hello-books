import jwt from 'jsonwebtoken';
import models from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';

/**
 * Middleware to check for authenticated user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function authMiddleware(req, res, next) {
  // check request for token
  const token = req.body.token || req.query.token || req.headers['x-token'];

  // if token not found return forbidden
  if (!token) {
    return errorResponseHandler(res, 'Access denied, please log in', 401);
  }

  // Verify token using jsonwebtokens
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return errorResponseHandler(res, 'Access denied, token could not be authenticated', 401);
    }

    return models.User
      .findOne({
        where: { id: decoded.user.id }
      })
      .then((user) => {
        if (!user) {
          return errorResponseHandler(res, 'Access denied, please login', 401);
        }

        req.auth = user;

        next();
      })
      .catch(() => errorResponseHandler(res));
  });
}

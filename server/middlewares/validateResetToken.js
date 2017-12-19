import jwt from 'jsonwebtoken';
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
export default (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return errorResponseHandler(res, 'Reset token is invalid', 400);
  }

  // Verify token using jsonwebtokens
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return errorResponseHandler(res, 'Reset token is invalid', 401);
    }

    return models.User
      .findOne({
        where: { username: decoded.user.id, resetPassword: true }
      })
      .then((user) => {
        if (!user) {
          return errorResponseHandler(res, 'Reset token is invalid', 401);
        }

        req.reset = user;

        next();
      })
      .catch(() => errorResponseHandler(res));
  });
};

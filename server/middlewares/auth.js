import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
    return res.status(401).send({
      error: 'Access denied, please log in'
    });
  }

  dotenv.config();

  // Verify token using jsonwebtokens
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: 'Access denied, token could not be authenticated'
      });
    }

    req.auth = decoded;
    next();
  });
}

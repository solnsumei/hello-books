import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export default function authMiddleware(req, res, next) {
    // check request for token
    const token = req.body.token || req.query.token || req.headers['x-token'];

    // if token not found return forbidden
    if (!token) {
      return res.status(403).send({
        error: 'Access denied, please log in'
      });
    }

    dotenv.config();

    // Verify token using jsonwebtokens
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          error: 'Access denied, token could not be authenticated'
        });
      }

      req.auth = decoded;
      next();
    });
};

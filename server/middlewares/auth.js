import jwt from 'jsonwebtoken';

export default function authMiddleware(app) {
  return (req, res, next) => {
    // check request for token
    const token = req.body.token || req.query.token || req.headers['x-token'];

    // if token not found return forbidden
    if (!token) {
      return res.status(403).send({
        error: 'Access denied, please log in'
      });
    }

    // Verify token using jsonwebtokens
    jwt.verify(token, app.get('webSecret'), (err, decoded) => {
      if (err) {
        return res.status(403).send({
          error: 'Access denied, token could not be authenticated'
        });
      }

      req.auth = decoded;
      next();
    });
  };
}

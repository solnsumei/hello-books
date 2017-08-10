export default function checkRequestMiddleware(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).send({ error: 'All fields are required!' });
  }
  next();
}
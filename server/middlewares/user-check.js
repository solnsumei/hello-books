export default function userCheck(req, res, next) {
  if (req.params.constructor === Object && Object.keys(req.params).length === 0) {
    return res.status(400).send({ error: 'Request parameter is required!' });
  }

  if (req.params.userId === null || !Number.isInteger(Number.parseInt(req.params.userId))) {
    return res.status(400).send({ error: 'User id not valid' });
  }

  if (req.auth.user.id != req.params.userId) {
    return res.status(401).send({ error: 'Not authorised' });
  }
  next();
}
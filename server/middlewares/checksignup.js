/**
 * Middleware to check if body parameters is null
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function checkSignUp(req, res, next) {

  const errors = {};

  if (req.body.username === undefined || req.body.username === null) {
    errors.username = 'Username is required';
  }

  if (req.body.email === undefined || req.body.email === null) {
    errors.email = 'Email is required';
  }

  if (req.body.password === undefined || req.body.password === null) {
    errors.password = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).send({errors});
  }

  next();
}

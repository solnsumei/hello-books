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

  if (!req.body.firstName || !req.body.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!req.body.surname || !req.body.surname.trim()) {
    errors.surname = 'Surname is required';
  }

  if (!req.body.username || !req.body.username.trim()) {
    errors.username = 'Username is required';
  }

  if (!req.body.email || !req.body.email.trim()) {
    errors.email = 'Email is required';
  }

  if (!req.body.password || !req.body.password.trim()) {
    errors.password = 'Password is required';
  }

  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }

  next();
}

/**
 * Middleware to check if body parameters is null
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function checkPasswordRequest(req, res, next) {
  const errors = {};

  if (req.body.oldPassword === undefined || req.body.oldPassword === null) {
    errors.oldPassword = 'Old password field is required';
  }

  if (req.body.password === undefined || req.body.password === null) {
    errors.password = 'Password field is required';
  }

  if (req.body.confirmPassword === undefined || req.body.confirmPassword === null) {
    errors.confirmPassword = 'Confirm password field is required';
  }

  if (req.body.oldPassword === req.body.password) {
    errors.password = 'Old and new password cannot be the same';
  }

  if (req.body.confirmPassword !== req.body.password) {
    errors.confirmPassword = 'Password and password confirmation do not match';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).send({ errors });
  }

  next();
}

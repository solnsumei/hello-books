import validationHelper from '../helpers/validationHelper';
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

  const rules = {
    oldPassword: 'required|string',
    password: 'required|string|min:8|max:255|confirmed',
  };

  return validationHelper(req, res, next, rules);
}

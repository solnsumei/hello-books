import validationHelper from '../helpers/validationHelper';

/**
 * Middleware to check if body parameters is null
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function checkSignUp(req, res, next) {
  const rules = {
    firstName: 'required|string|min:2|max:30',
    surname: 'required|string|min:2|max:30',
    username: 'required|string|min:2|max:30',
    email: 'required|email',
    password: 'required|min:8|max:255'
  };

  return validationHelper(req, res, next, rules);
}

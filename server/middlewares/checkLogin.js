import validationHelper from '../helpers/validationHelper';

/**
 * Middleware to check if body parameters is null
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function checkLogin(req, res, next) {
  const rules = {
    username: 'required',
    password: 'required'
  };

  return validationHelper(req, res, next, rules);
}

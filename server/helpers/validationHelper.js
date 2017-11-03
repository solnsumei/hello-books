import Validator from 'validatorjs';

/**
 * @export function
 * @param {any} req 
 * @param {any} res
 * @param {any} next
 * @param {any} rules 
 * @param {Object} customData
 * @returns {Request|Response|*|void|boolean} res
 */
export default function validationHelper(req, res, next, rules, customData = null) {
  const validation = new Validator(req.body, rules);

  if (customData) {
    validation.setAttributeNames(customData);
  }

  if (validation.fails()) {
    return res.status(400).send({
      errors: validation.errors.errors
    });
  }

  return next();
}

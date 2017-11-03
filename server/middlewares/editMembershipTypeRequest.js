import validatorHelper from '../helpers/validationHelper';

/**
 * Middleware to check edit membership type request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function editMembershipTypeRequest(req, res, next) {
  if (!parseInt(req.params.membershipTypeId, 10)) {
    return res.status(400).send({ error: 'Please provide a valid membership type id' });
  }

  const rules = {
    lendDuration: 'required|integer|min:1',
    maxBorrowable: 'required|integer|min:1'
  };

  return validatorHelper(req, res, next, rules);
}

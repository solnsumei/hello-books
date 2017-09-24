/**
 * Middleware to check edit membership type request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function editMembershipTypeRequest(req, res, next) {
  const errors = {};

  if (req.params.membershipTypeId === undefined || req.params.membershipTypeId === null ||
    !Number.isInteger(Number.parseInt(req.params.membershipTypeId, 10))) {
    return res.status(400).send({ error: 'Please provide a valid membership type id' });
  }

  if (req.body.lendDuration === undefined || req.body.lendDuration === null) {
    errors.lendDuration = 'Lend-duration is required';
  }

  if (req.body.lendDuration &&
     !Number.isInteger(Number.parseInt(req.body.lendDuration, 10))) {
    errors.lendDuration = 'Lend-duration must be a number';
  }

  if (req.body.maxBorrowable === undefined || req.body.maxBorrowable === null) {
    errors.maxBorrowable = 'Max-borrowable is required';
  }

  if (req.body.maxBorrowable &&
     !Number.isInteger(Number.parseInt(req.body.maxBorrowable, 10))) {
    errors.maxBorrowable = 'Max-borrowable must be a number';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).send({ errors });
  }

  next();
}

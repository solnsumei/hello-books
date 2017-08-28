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
    errors.firstName = 'FirstName is required';
  }

  if (!req.body.surname || !req.body.surname.trim()) {
    errors.surname = 'Surname is required';
  }

  if (!req.body.membershipType || !req.body.membershipType.trim()) {
    errors.membershipType = 'MembershipType is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).send({errors});
  }

  next();
}

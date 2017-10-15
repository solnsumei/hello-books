/**
 * Middleware to check if userId is passed as url params
 * and also validates authenticated users
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function validateUser(req, res, next) {
  if (req.params.userId === undefined || req.params.userId === null ||
    !Number.isInteger(parseInt(req.params.userId, 10))) {
    return res.status(400).send({ error: 'a valid user id is required' });
  }

  if (req.auth.id !== parseInt(req.params.userId, 10)) {
    return res.status(401).send({ error: 'You are not authorised to perform this action' });
  }

  next();
}

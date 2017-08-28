import db from '../models/index';

/**
 * Middleware to check membership type
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function checkMembershipType(req, res, next) {
  return db.MembershipType.find({
    attributes: ['membershipType'],
    where: {
      membershipType: req.body.membershipType
    }
  })
    .then(membershipType => {
      if (!membershipType) {
        return res.status(400).send({ error: 'Membership type selected not found, please choose a valid membershipType' });
      }

      next();
    });
}
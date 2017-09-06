import db from '../models/index';

/**
 * Middleware to check if user is eligible to borrow book
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */

export default function userCanBorrow(req, res, next) {

  return db.User
    .findOne({
      include: [{
        model: db.MembershipType,
        attributes: ['membershipType', 'lendDuration', 'maxBorrowable']
      }],
      where :
      {id: req.auth.id}
    })
    .then(user => {
      if(user){
        return db.UserBook.count({
          where: {
            userId: user.id,
            returned: false
          }
        })
          .then(result => {
            if(result > 0 && result >= user.MembershipType.maxBorrowable){
              return res.status(400).send({ error: 'You have exceeded the maximum bok you can hold at a time'})
            }

            req.lendDuration = user.MembershipType.lendDuration;

            next();

          });
      }
    })
    .catch(() => {
      return res.status(500).send({error: 'Request could not be processed, please try again later'});
    });
}

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

  return db.UserBook.count({
    where: {
      userId: req.auth.user.id,
      returned: false
    }
  })
    .then(result => {
      if(result > 0 && result >= req.auth.user.MembershipType.maxBorrowable){
        return res.status(409).send({error: 'Your have exceeded the maximum number of books you can hold at a time'})
      }

      next();

  });

}

import db from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';

/**
 * Middleware to check if user is eligible to borrow book
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @returns {Request|Response|*|void|boolean} res
 */
export default function borrowAccess(req, res, next) {
  return db.User
    .findOne({
      include: [{
        model: db.Membership,
        as: 'membership',
        attributes: ['level', 'lendDuration', 'maxBorrowable']
      }],
      where: { id: req.auth.id }
    })
    .then((user) => {
      if (user) {
        return db.BorrowedBook.count({
          where: {
            userId: user.id,
            returned: false
          }
        })
          .then((result) => {
            if (result > 0 && result >= user.membership.maxBorrowable) {
              return errorResponseHandler(res, 'You have exceeded the maximum book you can hold at a time', 409);
            }
            req.lendDuration = user.membership.lendDuration;

            next();
          });
      }
    })
    .catch(() => errorResponseHandler(res));
}

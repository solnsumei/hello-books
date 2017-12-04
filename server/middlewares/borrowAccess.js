import moment from 'moment';
import models from '../models/index';
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
  return models.User
    .findOne({
      include: [{
        model: models.Membership,
        as: 'membership',
        attributes: ['level', 'lendDuration', 'maxBorrowable']
      }],
      where: { id: req.auth.id }
    })
    .then((user) => {
      if (user) {
        return models.BorrowedBook.findAll({
          where: {
            userId: user.id,
            returned: false
          }
        })
          .then((result) => {
            if (result.length > 0) {
              const surcharge = result.filter(borrowedItem => borrowedItem.dueDate < new Date());

              if (surcharge.length > 0) {
                return errorResponseHandler(res, 'You have a pending surcharge, please return books in your possession', 409);
              }

              if (result >= user.membership.maxBorrowable) {
                return errorResponseHandler(res, 'You have exceeded the maximum book you can hold at a time', 409);
              }
            }
            req.lendDuration = user.membership.lendDuration;

            next();
          });
      }
    })
    .catch(() => errorResponseHandler(res));
}

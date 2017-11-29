import models from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';
import pagination from '../helpers/pagination';

const attributes = ['id', 'borrowDate', 'dueDate', 'returned', 'returnDate', 'isSeen'];

/**
 * Controller for viewing notifications
 * @exports {Object} notificationsController
 */
export default {

  /**
   * Method to get all unread notifications for admin
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Promise.<Object>} notifications
   */
  getAllUnreadNotifications(req, res) {
    const { offset, limit } = pagination(req.query.page, req.query.limit);
    return models.BorrowedBook
      .findAndCountAll({
        attributes,
        include: [{
          model: models.Book,
          as: 'book',
          attributes: ['title']
        },
        {
          model: models.User,
          as: 'user',
          attributes: ['firstName', 'surname', 'username']
        }],
        offset,
        limit,
        where: { isSeen: false }
      })
      .then(notifications => res.status(200).send({
        success: true,
        message: 'Unread Notifications loaded successfully',
        notifications
      }))
      .catch(() => errorResponseHandler(res));
  },

  /**
   * get a single notification and update
   * @method getNotification
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getNotification(req, res) {
    if (!parseInt(req.params.notificationId, 10)) {
      return errorResponseHandler(res, 'Notification id is invalid', 400);
    }

    return models.BorrowedBook
      .findOne({
        attributes,
        include: [{
          model: models.Book,
          as: 'book',
          attributes: ['title']
        },
        {
          model: models.User,
          as: 'user',
          attributes: ['firstName', 'surname', 'username']
        }],
        where: {
          id: req.params.notificationId,
          isSeen: false
        }
      })
      .then((notification) => {
        if (!notification) {
          return errorResponseHandler(res, 'Notification not found', 404);
        }

        return models.BorrowedBook.update({
          isSeen: true
        }, {
          where: {
            id: notification.id,
            isSeen: false,
          }
        })
          .then((result) => {
            if (result) {
              notification.isSeen = true;
              return res.status(200).send({
                success: true,
                message: 'Notification read successfully',
                notification
              });
            }
          }).catch(error => errorResponseHandler(res));
      })
      .catch(error => errorResponseHandler(res));
  },
};

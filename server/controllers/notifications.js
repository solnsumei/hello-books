import db from '../models/index';
import errorResponseHandler from '../helpers/errorResponseHandler';

const attributes = ['id', 'createdAt', 'dueDate', 'returned', 'isSeen'];

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
    return db.UserBook
      .findAll({
        attributes,
        include: [{
          model: db.Book,
          attributes: ['title']
        },
        {
          model: db.User,
          attributes: ['firstName', 'surname', 'username']
        }],
        where: { isSeen: false }
      })
      .then(notifications => res.status(200).send({ notifications }))
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
    if (!req.params.notificationId || !parseInt(req.params.notificationId, 10)) {
      return errorResponseHandler(res, 'Notification Id is invalid', 400);
    }

    return db.UserBook
      .findOne({
        attributes,
        include: [{
          model: db.Book,
          attributes: ['title']
        },
        {
          model: db.User,
          attributes: ['firstName', 'surname', 'username']
        }],
        where: {
          id: req.params.notificationId,
          isSeen: false
        }
      })
      .then((notification) => {
        if (!notification) {
          return errorResponseHandler(res, 'Notification with this Id is not available', 404);
        }

        return db.UserBook.update({
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
              return res.status(200).send({ notification });
            }
          }).catch(error => errorResponseHandler(res));
      })
      .catch(error => errorResponseHandler(res));
  },
};

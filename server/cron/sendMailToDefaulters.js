import models from '../models/index';
import { transport, mailOptions } from '../helpers/mailHelper';

/**
 * Sends email to users
 * @param {array} mailingList - mailing List
 * 
 * @return {void}
 */
const sendMail = (mailingList) => {
  if (mailingList.length > 0) {
    mailingList.map(item =>
      transport.sendMail(mailOptions(item.user, 'Surcharge', item.book),
        (error, info) => {
        }));
  }
};

/**
 * Fetches all users who have failed to return
 * books before due date
 * 
 * @return {function} sendMail - Sends mail
 */
const sendMailToDefaulters = () =>
  models.BorrowedBook
    .findAll({
      include: [
        { model: models.User, as: 'user', attributes: ['email', 'firstName', 'surname'] },
        { model: models.Book, as: 'book', attributes: ['title'] }
      ],
      where: {
        returned: false,
        dueDate: {
          $lt: new Date()
        }
      }
    }).then(borrowedList => sendMail(borrowedList));

export default sendMailToDefaulters;


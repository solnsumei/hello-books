import models from '../models/index';
import { transport, mailOptions } from '../helpers/mailHelper';

const sendMail = (mailingList) => {
  if (mailingList.length > 0) {
    mailingList.map(item =>
      transport.sendMail(mailOptions(item.user, 'Surcharge', item.book),
        (error, info) => {
        }));
  }
};

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


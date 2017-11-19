import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from '../../../helpers/constants';

const NotificationItem = ({ notification, action }) => (
  <tr>
    <td>{notification.book.title} {notification.returned ? 'was returned' : 'was borrowed'}</td>
    <td>{`${notification.user.firstName} ${notification.user.surname}`}</td>
    <td>{notification.returned ? moment(notification.returnDate).format('MMM Do YY') :
      moment(notification.borrowDate).format('MMM Do YY')}</td>
    <td><button
      onClick={action}
      className="btn waves-effect waves-light blue">
      View
    </button></td>
  </tr>
);


NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default NotificationItem;

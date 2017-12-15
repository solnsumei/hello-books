import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Notification item react component
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const NotificationItem = ({ notification, action }) => (
  <tr>
    <td>{notification.book.title} {notification.returned ? 'was returned' : 'was borrowed'}</td>
    <td>{`${notification.user.firstName} ${notification.user.surname}`}</td>
    <td>{notification.returned ? moment(notification.returnDate).format('MMM Do YY') :
      moment(notification.borrowDate).format('MMM Do YY')}</td>
    <td><button
      onClick={action} id={`read-${notification.id}`}
      className="btn waves-effect waves-light blue">
      View
    </button></td>
  </tr>
);


NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default NotificationItem;

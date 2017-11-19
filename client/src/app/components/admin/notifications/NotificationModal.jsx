import React from 'react';
import moment from 'moment';

const NotificationModal = ({ id, title, notification, action }) => (
  <div id={id} className="modal">
    <div className="modal-content black-text">
      <h4>{title}</h4>
      <p>Book Title:  {notification.book ? notification.book.title : ''}</p>
      <p>{notification.returned ? 'Returned by' : 'Borrowed by'}: {notification.user ?
        `${notification.user.firstName} ${notification.user.surname}` : ''}
      </p>
      <p>Date: {notification.returned ? moment(notification.returnDate).format('MMM Do YY') :
        moment(notification.borrowDate).format('MMM Do YY')}</p>
    </div>
    <div className="modal-footer">
      <button type="button"
        onClick={action} className="waves-effect waves-green btn-flat">
        Ok
      </button>
    </div>
  </div>
);

export default NotificationModal;

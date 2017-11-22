import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';

const readNotificationSuccess = notification => ({
  type: types.READ_NOTIFICATION_SUCCESS, notification
});

const loadUnreadNotificationsSuccess = notifications => ({
  type: types.LOAD_UNREAD_NOTIFICATIONS_SUCCESS, notifications
});

const loadUnreadNotifications = () => dispatch =>
  axios.get('/notifications')
    .then(({ data }) =>
      dispatch(loadUnreadNotificationsSuccess(data.notifications)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

const readNotification = notificationId => dispatch =>
  axios.get(`/notifications/${notificationId}`)
    .then(({ data }) => {
      dispatch(readNotificationSuccess(data.notification));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

// entry point for all notification actions
const notificationActions = (action, notificationId = null) => (dispatch) => {
  if (!authCheck(dispatch)) return;

  switch (action) {
    case types.LOAD_UNREAD_NOTIFICATIONS:
      return dispatch(loadUnreadNotifications());

    case types.READ_NOTIFICATION:
      return dispatch(readNotification(notificationId));

    default:
      break;
  }
};

export default notificationActions;

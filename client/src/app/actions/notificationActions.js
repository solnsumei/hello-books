import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

const readNotificationSuccess = notification => ({
  type: types.READ_NOTIFICATION_SUCCESS, notification
});

const loadUnreadNotificationsSuccess = notifications => ({
  type: types.LOAD_UNREAD_NOTIFICATIONS_SUCCESS, notifications
});

const loadUnreadNotifications = (page, limit) => (dispatch) => {
  const queryString = urlHelper('/notifications', page, limit);
  return axios.get(queryString)
    .then(({ data }) =>
      dispatch(loadUnreadNotificationsSuccess(data.notifications)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });
};

const readNotification = notificationId => dispatch =>
  axios.get(`/notifications/${notificationId}`)
    .then(({ data }) => {
      dispatch(readNotificationSuccess());
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

// entry point for all notification actions
const notificationActions = (action, ...params) => (dispatch) => {
  if (!authCheck(dispatch)) return;

  switch (action) {
    case types.LOAD_UNREAD_NOTIFICATIONS:
      return dispatch(loadUnreadNotifications(params[0], params[1]));

    case types.READ_NOTIFICATION:
      return dispatch(readNotification(params[0]));

    default:
      break;
  }
};

export default notificationActions;

import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

export const readNotificationSuccess = notification => ({
  type: types.READ_NOTIFICATION_SUCCESS, notification
});

export const loadUnreadNotificationsSuccess = notifications => ({
  type: types.LOAD_UNREAD_NOTIFICATIONS_SUCCESS, notifications
});

const actionError = () => ({
  type: types.FAILED_ACTION
});

const loadUnreadNotifications = (page, limit) => (dispatch) => {
  const queryString = urlHelper('/notifications', page, limit);
  return axios.get(queryString)
    .then(({ data }) =>
      dispatch(loadUnreadNotificationsSuccess(data.notifications)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      dispatch(actionError());
    });
};

const readNotification = notificationId => dispatch =>
  axios.get(`/notifications/${notificationId}`)
    .then(({ data }) => dispatch(readNotificationSuccess(data.notification)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      dispatch(actionError());
    });

// entry point for all notification actions
const notificationActions = (action, ...params) => (dispatch) => {
  if (!authCheck(dispatch)) return dispatch(actionError());

  switch (action) {
    case types.LOAD_UNREAD_NOTIFICATIONS:
      return dispatch(loadUnreadNotifications(params[0], params[1]));

    case types.READ_NOTIFICATION:
      return dispatch(readNotification(params[0]));

    default:
      return dispatch(actionError());
  }
};

export default notificationActions;

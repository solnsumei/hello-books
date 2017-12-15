import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

/**
 * Triggers the notification reducer to update notification in state
 * @param {Object} notification
 * 
 * @returns {Object} with a type as string and a notification object
 */
export const readNotificationSuccess = notification => ({
  type: types.READ_NOTIFICATION_SUCCESS, notification
});

/**
 * Triggers the notification reducer to update notification array in state
 * @param {array} notifications
 * 
 * @returns {Object} with a type as string and a notification array
 */
export const loadUnreadNotificationsSuccess = notifications => ({
  type: types.LOAD_UNREAD_NOTIFICATIONS_SUCCESS, notifications
});

const actionError = () => ({
  type: types.FAILED_ACTION
});

/**
 * Fetches all unread notifications from the api endpoint
 * @param {string} page
 * @param {integer} limit
 * 
 * @returns {function} dispatch
 */
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

/**
 * Gets and updates a single notification by id
 * @param {integer} notificationId
 * 
 * @returns {function} dispatch
 */
const readNotification = notificationId => dispatch =>
  axios.get(`/notifications/${notificationId}`)
    .then(({ data }) => dispatch(readNotificationSuccess(data.notification)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      dispatch(actionError());
    });

/**
 * Entry point for all notification action
 * Determnines the action to trigger
 * @param {string} action - action to perform
 * @param {array} params - optional parameters
 * 
 * @returns {function} dispatch
 */
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

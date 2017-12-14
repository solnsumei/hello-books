import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Notification reducer
 * handles fetching and reading borrow notifications by admin in state
 * @param {object} state
 * @param {object} action
 * 
 * @returns {object} state
 */
export default function (state = initialState.notifications, action) {
  switch (action.type) {
    case types.LOAD_UNREAD_NOTIFICATIONS_SUCCESS:
      return action.notifications.rows;

    case types.READ_NOTIFICATION_SUCCESS:
      return [...state.filter(notification => notification.id !== action.notification.id)];

    default:
      return state;
  }
}

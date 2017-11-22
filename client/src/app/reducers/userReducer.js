import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = initialState.user, action) {
  switch (action.type) {
    case types.USER_AUTH_SUCCESS:
      return action.user;

    case types.GET_USER_PROFILE_SUCCESS:
      return action.user;

    case types.USER_AUTH_FAILED:
      return state;

    default:
      return state;
  }
}

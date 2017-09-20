import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = initialState.currentUser, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:

      return [...state, Object.assign({}, action.user)];

    default:
      return state;
  }
}

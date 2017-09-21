import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = initialState.user, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return Object.assign({}, ...state, action.user);

    default:
      return state;
  }
}

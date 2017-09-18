import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = '', action) {
  switch (action.type) {
    case types.SIGN_UP_USER_SUCCESS:
      return [...state, Object.assign({}, action.user)];

    default:
      return state;
  }
}

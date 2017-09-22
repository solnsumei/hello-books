import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = initialState.redirectUrl, action) {
  switch (action.type) {
    case types.SET_REDIRECT_URL:
      return Object.assign({}, ...state, action.redirectUrl);

    default:
      return state;
  }
}

import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = initialState.memberships, action) {
  switch (action.type) {
    case types.LOAD_MEMBERSHIP_TYPES_SUCCESS:
      return action.memberships;

    case types.UPDATE_MEMBERSHIP_TYPE_SUCCESS:
      return [...state.filter(membership => membership.id !== action.membership.id),
        action.membership];

    default:
      return state;
  }
}

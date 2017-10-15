import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = initialState.membershipTypes, action) {
  switch (action.type) {
    case types.LOAD_MEMBERSHIP_TYPES_SUCCESS:
      return action.membershipTypes;

    case types.UPDATE_MEMBERSHIP_TYPE_SUCCESS:
      return [...state.filter(membershipType => membershipType.id !== action.membershipType.id),
        Object.assign({}, action.membershipType)];

    default:
      return state;
  }
}

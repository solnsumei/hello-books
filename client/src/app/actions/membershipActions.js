import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';

/**
 * Triggers the membership reducer to update membership array in state
 * @param {Object} memberships
 * 
 * @returns {Object} with a type as string and a membership array
 */
export const loadMembershipTypesSuccess = memberships => ({
  type: types.LOAD_MEMBERSHIP_TYPES_SUCCESS, memberships
});

/**
 * Triggers the membership reducer to update category in state
 * @param {Object} membership
 * 
 * @returns {Object} with a type as string and a membership object
 */
export const updateMembershipTypeSuccess = membership => ({
  type: types.UPDATE_MEMBERSHIP_TYPE_SUCCESS, membership
});

/**
 * Error action type to call when action fails
 * @param {void} null
 * 
 * @returns {string} type
 */
const actionError = () => ({
  type: types.FAILED_ACTION
});

/**
 * Fetches all membership types from the api endpoint
 * 
 * @returns {function} dispatch
 */
const loadMembershipTypes = () => dispatch =>
  axios.get('/membership')
    .then(({ data }) => dispatch(loadMembershipTypesSuccess(data.memberships)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });

/**
 * Updates membership api call
 * @param {Object} membership - membership type to update
 * 
 * @returns {function} dispatch
 */
const updateMembershipType = membership => dispatch =>
  axios.put(`/membership/${membership.id}`, membership)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(updateMembershipTypeSuccess(data.membership));
    });


/**
 * Entry point for all membership actions
 * Determnines the membership action to trigger
 * @param {string} action - action to perform
 * @param {Object} membership - membership object
 * 
 * @returns {function} dispatch
 */
const membershipActions = (action, membership = null) => (dispatch) => {
  if (!authCheck(dispatch)) return dispatch(actionError());

  switch (action) {
    case types.LOAD_MEMBERSHIP_TYPES:
      return dispatch(loadMembershipTypes());

    case types.UPDATE_MEMBERSHIP_TYPE:
      return dispatch(updateMembershipType(membership));

    default:
      return dispatch(actionError());
  }
};

export default membershipActions;

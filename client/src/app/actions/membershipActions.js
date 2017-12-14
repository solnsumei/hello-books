import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';

export const loadMembershipTypesSuccess = memberships => ({
  type: types.LOAD_MEMBERSHIP_TYPES_SUCCESS, memberships
});

export const updateMembershipTypeSuccess = membership => ({
  type: types.UPDATE_MEMBERSHIP_TYPE_SUCCESS, membership
});

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

const updateMembershipType = membership => dispatch =>
  axios.put(`/membership/${membership.id}`, membership)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(updateMembershipTypeSuccess(data.membership));
    });


// action entry point for memebrship type actions
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

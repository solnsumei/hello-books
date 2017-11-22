import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';

const loadMembershipTypesSuccess = memberships => ({
  type: types.LOAD_MEMBERSHIP_TYPES_SUCCESS, memberships
});

const updateMembershipTypeSuccess = membership => ({
  type: types.UPDATE_MEMBERSHIP_TYPE_SUCCESS, membership
});

const loadMembershipTypes = () => dispatch =>
  axios.get('/membership')
    .then(({ data }) => dispatch(loadMembershipTypesSuccess(data.memberships)))
    .catch(({ response }) => {
      if (response.data) {
        toastr.error(response.data.error);
      }
    });

const updateMembershipType = membership => dispatch =>
  axios.put(`/membership/${membership.id}`, membership)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(updateMembershipTypeSuccess(data.membership));
    });


// action entry point for memebrship type actions
const membershipActions = (action, membership = null) => (dispatch) => {
  if (!authCheck(dispatch)) return;

  switch (action) {
    case types.LOAD_MEMBERSHIP_TYPES:
      return dispatch(loadMembershipTypes());

    case types.UPDATE_MEMBERSHIP_TYPE:
      return dispatch(updateMembershipType(membership));

    default:
      break;
  }
};

export default membershipActions;

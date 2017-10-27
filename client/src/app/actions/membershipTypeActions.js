import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';

const loadMembershipTypesSuccess = membershipTypes => ({
  type: types.LOAD_MEMBERSHIP_TYPES_SUCCESS, membershipTypes
});

const updateMembershipTypeSuccess = membershipType => ({
  type: types.UPDATE_MEMBERSHIP_TYPE_SUCCESS, membershipType
});

const loadMembershipTypes = headers => dispatch =>
  axios.get('/membershiptypes', headers)
    .then(({ data }) => dispatch(loadMembershipTypesSuccess(data.membershipTypes)))
    .catch(({ response }) => {
      toastr(response.data.error);
    });

const updateMembershipType = (membershipType, headers) => dispatch =>
  axios.put(`/membershiptypes/${membershipType.id}`, membershipType, headers)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(updateMembershipTypeSuccess(data.membershipType));
    });


// action entry point for memebrship type actions
const membershipTypeActions = (action, membershipType = null) => (dispatch) => {
  const headers = authCheck(dispatch);

  switch (action) {
    case types.LOAD_MEMBERSHIP_TYPES:
      return dispatch(loadMembershipTypes(headers));

    case types.UPDATE_MEMBERSHIP_TYPE:
      return dispatch(updateMembershipType(membershipType, headers));

    default:
      break;
  }
};

export default membershipTypeActions;

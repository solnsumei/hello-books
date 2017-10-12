import axios from 'axios';
import types from './actionTypes';
import { authCheck } from './userActions';

const loadMembershipTypesSuccess = membershipTypes => ({
  type: types.LOAD_MEMBERSHIP_TYPES_SUCCESS, membershipTypes
});

const updateMembershipTypeSuccess = membershipType => ({
  type: types.UPDATE_MEMBERSHIP_TYPE_SUCCESS, membershipType
});

const loadMembershipTypes = headers => dispatch =>
  axios.get('/api/v1/membershiptypes', headers)
    .then(({ data }) => dispatch(loadMembershipTypesSuccess(data.membershipTypes)))
    .catch(({ response }) => {
      throw (response);
    });

const updateMembershipType = (membershipType, headers) => dispatch =>
  axios.put(`/api/v1/membershiptypes/${membershipType.id}`, membershipType, headers)
    .then(({ data }) => dispatch(updateMembershipTypeSuccess(data.membershipType)));


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

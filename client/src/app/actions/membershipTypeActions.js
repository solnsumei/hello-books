import axios from 'axios';
import types from './actionTypes';
import { authCheck } from './userActions';

const loadMembershipTypeSuccess = membershipTypes => ({
  type: types.LOAD_MEMBERSHIP_TYPE_SUCCESS, membershipTypes
});

const loadMembershipTypes = () => (dispatch) => {
  const headers = authCheck(dispatch);
  return axios.get('/api/v1/membershiptypes', headers)
    .then(({ data }) => dispatch(loadMembershipTypeSuccess(data)))
    .catch(({ response }) => {
      throw (response);
    });
};

export { loadMembershipTypes, loadMembershipTypeSuccess };

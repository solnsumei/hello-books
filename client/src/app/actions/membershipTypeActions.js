import axios from 'axios';
import types from './actionTypes';

// axios.defaults.baseURL = 'http://localhost:8000/api/v1';

// axios.defaults.headers.post['Content-Type'] = 'application/json';


const loadMembershipTypeSuccess = membershipTypes => ({
  type: types.LOAD_MEMBERSHIP_TYPE_SUCCESS, membershipTypes
});

const loadMembershipTypes = () => (dispatch) => {
  const token = localStorage.getItem(types.USER_TOKEN);
  axios.defaults.headers.common['x-token'] = token;

  return axios.get('/api/v1/membershiptypes')
    .then(({ data }) => dispatch(loadMembershipTypeSuccess(data)))
    .catch(({ response }) => {
      throw (response);
    });
};

export { loadMembershipTypes, loadMembershipTypeSuccess };

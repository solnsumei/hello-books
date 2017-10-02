import axios from 'axios';
import types from './actionTypes';
import { constants } from '../helpers/constants';

// axios.defaults.baseURL = 'http://localhost:8000/api/v1';

// axios.defaults.headers.post['Content-Type'] = 'application/json';


const loadMembershipTypeSuccess = membershipTypes => ({
  type: types.LOAD_MEMBERSHIP_TYPE_SUCCESS, membershipTypes
});

const loadMembershipTypes = () => dispatch =>
  axios.get('/api/v1/membershiptypes', constants())
    .then(({ data }) => dispatch(loadMembershipTypeSuccess(data)))
    .catch(({ response }) => {
      throw (response);
    });

export { loadMembershipTypes, loadMembershipTypeSuccess };

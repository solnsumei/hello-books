import axios from 'axios';
import types from './actionTypes';

// axios.defaults.baseURL = 'http://localhost:8000/api/v1';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';


const userSignUpSuccess = user => ({
  type: types.SIGN_UP_USER_SUCCESS, user
});

const userSignUpRequest = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData)
  /* eslint-disable */
    .then(response => console.log(response))
    .catch(error => console.log(error));
/* eslint-enable */

export { userSignUpSuccess, userSignUpRequest };

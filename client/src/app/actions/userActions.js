import axios from 'axios';
import types from './actionTypes';

// axios.defaults.baseURL = 'http://localhost:8000/api/v1';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const userSignUpRequest = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData);

const loginRequest = loginData => dispatch =>
  axios.post('/api/v1/users/signin', loginData)
    .then(({ data }) => {
      const token = data.token;
      console.log(token);
      // localStorage.setItem('userToken', data.token);
      // return dispatch(loginUserSuccess());
    });

export { loginRequest, userSignUpRequest };

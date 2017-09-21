import axios from 'axios';
import jwt from 'jsonwebtoken';
import types from './actionTypes';


// axios.defaults.baseURL = 'http://localhost:8000/api/v1';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';
//
const SECRET = 'Wd123faghye@thyggejjd231';
const USER_TOKEN = 'userToken';

const setAuthUser = (token = null) => {
  const userToken = localStorage.getItem('userToken');

  if (!token && !userToken) return false;

  const decoded = jwt.verify((!token ? userToken : token), SECRET);
  if (!decoded) {
    if (userToken) {
      localStorage.removeItem(USER_TOKEN);
    }
    return false;
  }
  console.log(decoded.user);
  return decoded.user;
};

const loginUserSuccess = token => ({
  type: types.LOGIN_USER_SUCCESS, token
});

const userSignUpRequest = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData);

const loginRequest = loginData => dispatch =>
  axios.post('/api/v1/users/signin', loginData)
    .then(({ data }) => {
      localStorage.setItem(USER_TOKEN, data.token);
      const user = setAuthUser(data.token);
      return dispatch(loginUserSuccess(user));
    });

export { loginRequest, userSignUpRequest, loginUserSuccess, setAuthUser };

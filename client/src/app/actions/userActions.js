import axios from 'axios';
import jwt from 'jsonwebtoken';
import types from './actionTypes';


// axios.defaults.baseURL = 'http://localhost:8000/api/v1';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const SECRET = 'Wd123faghye@thyggejjd231';

// check token passed in and set user accordingly
const setAuthUser = (token = null) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);

  if (!token && !userToken) return false;

  const decoded = jwt.verify((!token ? userToken : token), SECRET);
  if (!decoded) {
    if (userToken) {
      localStorage.removeItem(types.USER_TOKEN);
    }
    return false;
  }
  return decoded.user;
};

const signOutUser = () => ({
  type: types.SIGN_OUT_USER
});

const userAuthSuccess = user => ({
  type: types.USER_AUTH_SUCCESS, user
});

const userAuthFailed = () => ({
  type: types.USER_AUTH_FAILED
});

// check user authentication
const checkAuthentication = () => (dispatch) => {
  const user = setAuthUser();
  if (!user) {
    return dispatch(userAuthFailed());
  }
  return dispatch(userAuthSuccess(user));
};

const logoutRequest = () => (dispatch) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);
  if (userToken) {
    localStorage.removeItem(types.USER_TOKEN);
    return dispatch(signOutUser());
  }
  return dispatch(userAuthFailed());
};

const userSignUpRequest = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData);

const loginRequest = loginData => dispatch =>
  axios.post('/api/v1/users/signin', loginData)
    .then(({ data }) => {
      localStorage.setItem(types.USER_TOKEN, data.token);
      const user = setAuthUser(data.token);
      return dispatch(userAuthSuccess(user));
    });

export { loginRequest, userSignUpRequest, userAuthSuccess, checkAuthentication, logoutRequest };

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

  try {
    const decoded = jwt.verify((!token ? userToken : token), SECRET);
    return decoded.user;
  } catch (err) {
    if (userToken) {
      localStorage.removeItem(types.USER_TOKEN);
    }
    return false;
  }
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

const updateUserAccount = userData => (dispatch) => {
  const token = localStorage.getItem(types.USER_TOKEN);
  return axios.put('/api/v1/users/profile', userData, { headers: { 'x-token': token } })
    .then(({ data }) => {
      localStorage.setItem(types.USER_TOKEN, data.token);
      const user = setAuthUser(data.token);
      return dispatch(userAuthSuccess(user));
    });
};

const loginRequest = loginData => dispatch =>
  axios.post('/api/v1/users/signin', loginData)
    .then(({ data }) => {
      localStorage.setItem(types.USER_TOKEN, data.token);
      const user = setAuthUser(data.token);
      return dispatch(userAuthSuccess(user));
    });

const userSignUpRequest = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData)
    .then(({ data }) => {
      localStorage.setItem(types.USER_TOKEN, data.token);
      const user = setAuthUser(data.token);
      return dispatch(userAuthSuccess(user));
    });

export { loginRequest, userSignUpRequest, userAuthSuccess,
  updateUserAccount, checkAuthentication, logoutRequest };

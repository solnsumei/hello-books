import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import types from './actionTypes';
import { constants } from '../helpers/constants';

// set axios default header
const setHeader = () => {
  axios.defaults.headers.common['x-token']
    = localStorage.getItem(types.USER_TOKEN);
};

// check token passed in and set user accordingly
const checkToken = (token = null) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);

  if (!token && !userToken) return false;
  const decoded = jwt.decode(!token ? userToken : token);
  if (decoded.exp * 1000 < (new Date().getTime())) {
    if (userToken) {
      localStorage.removeItem(types.USER_TOKEN);
    }
    axios.defaults.headers.common = {};
    return false;
  }
  setHeader();
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

const setUser = data => (dispatch) => {
  localStorage.setItem(types.USER_TOKEN, data.token);
  setHeader();
  toastr.success(data.message);
  return dispatch(userAuthSuccess(data.user));
};

const authCheck = (dispatch) => {
  if (!checkToken()) {
    return dispatch(signOutUser());
  }
};

const logoutRequest = () => (dispatch) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);
  if (userToken) {
    localStorage.removeItem(types.USER_TOKEN);
  }
  axios.defaults.headers.common = {};
  return dispatch(signOutUser());
};

const getUserAccount = () => (dispatch) => {
  authCheck(dispatch);

  return axios.get('/user/profile')
    .then(({ data }) => dispatch(userAuthSuccess(data.user)));
};

// check user authentication
const checkAuthentication = () => (dispatch) => {
  const user = checkToken();
  if (!user) {
    return dispatch(signOutUser());
  }
  dispatch(userAuthSuccess(user));
  return dispatch(getUserAccount());
};

const updateUserAccount = userData => (dispatch) => {
  authCheck(dispatch);

  return axios.put('/user/profile', userData)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(userAuthSuccess(data.user));
    });
};

const changeUserPassword = passwordObject => (dispatch) => {
  const headers = authCheck(dispatch);

  return axios.post('/user/change-password', passwordObject)
    .then(({ data }) => {
      toastr.success(data.message);
    });
};

const loginRequest = loginData => dispatch =>
  axios.post('/users/signin', loginData)
    .then(({ data }) => dispatch(setUser(data)));

const userSignUpRequest = userData => dispatch =>
  axios.post('/users/signup', userData)
    .then(({ data }) => dispatch(setUser(data)));

export { loginRequest, userSignUpRequest, updateUserAccount,
  checkAuthentication, logoutRequest, authCheck, getUserAccount, changeUserPassword };

import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import types from './actionTypes';
import { constants } from '../helpers/constants';

// check token passed in and set user accordingly
const checkToken = (token = null) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);

  if (!token && !userToken) return false;
  const decoded = jwt.decode(!token ? userToken : token);
  if (decoded.exp * 1000 < (new Date().getTime())) {
    if (userToken) {
      localStorage.removeItem(types.USER_TOKEN);
    }
    return false;
  }
  return true;
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
  toastr.success(data.message);
  return dispatch(userAuthSuccess(data.user));
};

const authCheck = (dispatch) => {
  if (!checkToken()) {
    return dispatch(signOutUser());
  }
  return ({ headers: { 'x-token': localStorage.getItem(types.USER_TOKEN) } });
};

const logoutRequest = () => (dispatch) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);
  if (userToken) {
    localStorage.removeItem(types.USER_TOKEN);
  }
  return dispatch(signOutUser());
};

const getUserAccount = () => (dispatch) => {
  const headers = authCheck(dispatch);

  return axios.get('/user/profile', headers)
    .then(({ data }) => dispatch(userAuthSuccess(data.user)));
};

// check user authentication
const checkAuthentication = () => (dispatch) => {
  if (!checkToken()) {
    return dispatch(signOutUser());
  }
  return dispatch(getUserAccount());
};

const updateUserAccount = userData => (dispatch) => {
  const headers = authCheck(dispatch);

  return axios.put('/user/profile', userData, headers)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(userAuthSuccess(data.user));
    });
};

const changeUserPassword = passwordObject => (dispatch) => {
  const headers = authCheck(dispatch);

  return axios.post('/user/change-password', passwordObject, headers)
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

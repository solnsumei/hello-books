import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import types from './actionTypes';
import { constants } from '../helpers/constants';

// check token passed in and set user accordingly
const setAuthUser = (token = null) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);

  if (!token && !userToken) return false;
  const decoded = jwt.decode(!token ? userToken : token);
  if (decoded.exp * 1000 < (new Date().getTime())) {
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
    return dispatch(signOutUser());
  }
  return dispatch(userAuthSuccess(user));
};

const authCheck = (dispatch) => {
  const user = setAuthUser();
  if (!user) {
    return dispatch(signOutUser());
  }
  return ({ headers: { 'x-token': localStorage.getItem(types.USER_TOKEN) } });
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
  const headers = authCheck(dispatch);

  return axios.put('/users/profile', userData, headers)
    .then(({ data }) => {
      localStorage.setItem(types.USER_TOKEN, data.token);
      const user = setAuthUser(data.token);
      toastr.success(data.message);
      return dispatch(userAuthSuccess(user));
    });
};

const changeUserPassword = passwordObject => (dispatch) => {
  const headers = authCheck(dispatch);

  return axios.post('/users/change-password', passwordObject, headers)
    .then(({ data }) => {
      toastr.success(data.message);
    });
};

const loginRequest = loginData => dispatch =>
  axios.post('/users/signin', loginData)
    .then(({ data }) => {
      localStorage.setItem(types.USER_TOKEN, data.token);
      const user = setAuthUser(data.token);
      toastr.success(data.message);
      return dispatch(userAuthSuccess(user));
    });

const userSignUpRequest = userData => dispatch =>
  axios.post('/users/signup', userData)
    .then(({ data }) => {
      localStorage.setItem(types.USER_TOKEN, data.token);
      const user = setAuthUser(data.token);
      toastr.success(data.message);
      return dispatch(userAuthSuccess(user));
    });

export { loginRequest, userSignUpRequest, updateUserAccount,
  checkAuthentication, logoutRequest, authCheck, changeUserPassword };

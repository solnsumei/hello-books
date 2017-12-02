import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import types from './actionTypes';
import borrowActions from './borrowActions';
import { constants } from '../helpers/constants';

// remove set tokens
const removeTokens = () => {
  localStorage.removeItem(types.USER_TOKEN);
  localStorage.removeItem(types.ADMIN);
};

// check token passed in and set user accordingly
const checkToken = (token = null) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);

  if (!token && !userToken) return false;
  const decoded = jwt.decode(!token ? userToken : token);
  if (decoded.exp * 1000 < (new Date().getTime())) {
    if (userToken) {
      removeTokens();
    }
    return false;
  }

  const user = decoded.user;
  user.admin = localStorage.getItem(types.ADMIN) === 'true' || false;

  return user;
};

const signOutUser = () => {
  delete axios.defaults.headers.common['x-token'];
  return { type: types.SIGN_OUT_USER };
};

const userAuthSuccess = (user) => {
  axios.defaults.headers.common['x-token'] = localStorage.getItem(types.USER_TOKEN);
  return { type: types.USER_AUTH_SUCCESS, user };
};

const getUserProfileSuccess = user => ({
  type: types.GET_USER_PROFILE_SUCCESS, user
});

const userAuthFailed = () => ({
  type: types.USER_AUTH_FAILED
});

const setUser = data => (dispatch) => {
  localStorage.setItem(types.USER_TOKEN, data.token);
  localStorage.setItem(types.ADMIN, data.user.admin);
  toastr.success(data.message);
  return dispatch(userAuthSuccess(data.user));
};

const authCheck = (dispatch) => {
  if (!checkToken()) {
    dispatch(signOutUser());
    return false;
  }
  return true;
};

const logoutRequest = () => (dispatch) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);
  const adminToken = localStorage.getItem(types.ADMIN);
  if (userToken || adminToken) {
    removeTokens();
  }
  return dispatch(signOutUser());
};

const getUserProfile = (user = null) => (dispatch) => {
  authCheck(dispatch);
  return axios.get('/user/profile')
    .then(({ data }) => dispatch(getUserProfileSuccess(data.user)));
};

// check user authentication
const checkAuthentication = () => (dispatch) => {
  const user = checkToken();
  if (!user) {
    return dispatch(userAuthFailed());
  }
  dispatch(userAuthSuccess(user));
  dispatch(borrowActions(types.LOAD_BORROWED_BOOKS));
  return dispatch(getUserProfile(user));
};

const updateUserAccount = userData => (dispatch) => {
  authCheck(dispatch);
  return axios.put('/user/profile', userData)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(getUserProfile());
    });
};

const changeUserPassword = passwordObj => (dispatch) => {
  authCheck(dispatch);
  return axios.post('/user/change-password', passwordObj)
    .then(({ data }) => {
      toastr.success(data.message);
    });
};

const forgotPassword = entry => dispatch =>
  axios.post('/users/forgot-password', entry);

const resetPassword = (passwordObj, token) => dispatch =>
  axios.post(`/users/reset-password?token=${token}`, passwordObj);

const loginRequest = loginData => dispatch =>
  axios.post('/users/signin', loginData)
    .then(({ data }) => dispatch(setUser(data)));

const userSignUpRequest = userData => dispatch =>
  axios.post('/users/signup', userData)
    .then(({ data }) => dispatch(setUser(data)));

export { loginRequest, userSignUpRequest, updateUserAccount, forgotPassword, resetPassword,
  checkAuthentication, logoutRequest, authCheck, getUserProfile, changeUserPassword };

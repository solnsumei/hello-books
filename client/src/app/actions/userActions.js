import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import types from './actionTypes';
import borrowActions from './borrowActions';
import { constants } from '../helpers/constants';

/**
 * Removes local storage items
 * 
 * @returns {void}
 */
const removeTokens = () => {
  localStorage.removeItem(types.USER_TOKEN);
  localStorage.removeItem(types.ADMIN);
};

/**
 * Checks for valid jwt token in localStorage
 * 
 * @returns {Object|boolean} if successful return a user object else boolean false
 */
const checkToken = () => {
  const userToken = localStorage.getItem(types.USER_TOKEN);

  if (!userToken) return false;
  const decoded = jwt.decode(userToken);
  if (!decoded || decoded.exp * 1000 < (new Date().getTime())) {
    removeTokens();
    return false;
  }

  // set user to the decoded token
  const user = decoded.user;
  user.admin = localStorage.getItem(types.ADMIN) === 'true' || false;

  return user;
};

/**
 * Triggers user reducer to clear state and log out user
 * 
 * @returns {Object} with string type
 */
export const signOutUser = () => {
  delete axios.defaults.headers.common['x-token'];
  return { type: types.SIGN_OUT_USER };
};

/**
 * Validates authenticated user
 * @param {Object} user
 * 
 * @returns {Object} with string type and user object
 */
const userAuthSuccess = (user) => {
  axios.defaults.headers.common['x-token'] = localStorage.getItem(types.USER_TOKEN);
  return { type: types.USER_AUTH_SUCCESS, user };
};

/**
 * Triggers user reducer to update the user profile in state
 * @param {Object} user
 * 
 * @returns {Object} with string type and user object
 */
const getUserProfileSuccess = user => ({
  type: types.GET_USER_PROFILE_SUCCESS, user
});

/**
 * Dispatched when user successfully resets password
 * @param {Object} user
 * 
 * @returns {Object} with string type
 */
const resetPasswordSuccess = user => ({
  type: types.RESET_PASSWORD_SUCCESS
});

/**
 * Dispatched when user successfully chnages password
 * @param {Object} user
 * 
 * @returns {Object} with string type
 */
const changePasswordSuccess = () => ({
  type: types.CHANGE_PASSWORD_SUCCESS
});

/**
 * Dispatched when authentication fails
 * 
 * @returns {Object} with string type
 */
const userAuthFailed = () => ({
  type: types.USER_AUTH_FAILED
});

/**
 * Sets user data in localStorage and dispatches authSuccess action
 * @param {Object} data
 * 
 * @returns {function} dispatch
 */
const setUser = data => (dispatch) => {
  localStorage.setItem(types.USER_TOKEN, data.token);
  localStorage.setItem(types.ADMIN, data.user.admin);
  toastr.success(data.message);
  return dispatch(userAuthSuccess(data.user));
};

/**
 * Validates authenticated user and triggers signout action
 * If user token has expired 
 * @param {function} dispatch
 * 
 * @returns {boolean} true or false
 */
const authCheck = (dispatch) => {
  if (!checkToken()) {
    dispatch(signOutUser());
    return false;
  }
  return true;
};

/**
 * Logs user out of the application
 * removes all localStorage items set by app
 * 
 * @returns {function} dispatch
 */
const logoutRequest = () => (dispatch) => {
  const userToken = localStorage.getItem(types.USER_TOKEN);
  const adminToken = localStorage.getItem(types.ADMIN);
  removeTokens();
  return dispatch(signOutUser());
};

/**
 * Fetches logged in user profile from the backend
 * @param {Object|void} user
 * 
 * @returns {function} dispatch
 */
const getUserProfile = (user = null) => (dispatch) => {
  authCheck(dispatch);
  return axios.get('/user/profile')
    .then(({ data }) => dispatch(getUserProfileSuccess(data.user)));
};

/**
 * Checks user is still authenticated
 * @param {Object} user
 * 
 * @returns {function} dispatch
 */
const checkAuthentication = () => (dispatch) => {
  const user = checkToken();
  if (!user) {
    return dispatch(userAuthFailed());
  }
  dispatch(userAuthSuccess(user));
  dispatch(borrowActions(types.LOAD_BORROWED_BOOKS));
  return dispatch(getUserProfile(user));
};

/**
 * Update user profile
 * @param {Object} userData
 * 
 * @returns {function} dispatch
 */
const updateUserAccount = userData => (dispatch) => {
  authCheck(dispatch);
  return axios.put('/user/profile', userData)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(getUserProfile());
    });
};

/**
 * Changes logged in user password
 * @param {Object} passwordObj
 * 
 * @returns {function} dispatch
 */
const changeUserPassword = passwordObj => (dispatch) => {
  authCheck(dispatch);
  return axios.post('/user/change-password', passwordObj)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(changePasswordSuccess());
    });
};

/**
 * Forgot password request
 * @param {string} entry
 * 
 * @returns {function} dispatch
 */
const forgotPassword = entry => dispatch =>
  axios.post('/users/forgot-password', entry)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(resetPasswordSuccess());
    });

/**
 * Reset user's forgotten password
 * @param {string} passwordObj
 * @param {string} token
 * 
 * @returns {function} dispatch
 */
const resetPassword = (passwordObj, token) => dispatch =>
  axios.post(`/users/reset-password?token=${token}`, passwordObj)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(resetPasswordSuccess());
    });

/**
 * Logs user into the app
 * @param {string} loginData
 * 
 * @returns {function} dispatch
 */
const loginRequest = loginData => dispatch =>
  axios.post('/users/signin', loginData)
    .then(({ data }) => dispatch(setUser(data)));

/**
 * Creates user account
 * @param {string} userData
 * 
 * @returns {function} dispatch
 */
const userSignUpRequest = userData => dispatch =>
  axios.post('/users/signup', userData)
    .then(({ data }) => dispatch(setUser(data)));

export { loginRequest, userSignUpRequest, updateUserAccount, forgotPassword, resetPassword,
  checkAuthentication, logoutRequest, authCheck, getUserProfile, changeUserPassword };

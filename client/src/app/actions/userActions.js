import axios from 'axios';
import types from './actionTypes';

const userSignUpSuccess = user => ({
  type: types.SIGN_UP_USER_SUCCESS, user
});

const userSignUpRequest = userData => dispatch => axios.post(
  `${types.API_URL}users/signup`, userData
);

export { userSignUpSuccess, userSignUpRequest };

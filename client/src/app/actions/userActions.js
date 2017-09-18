import types from './actionTypes';

const userSignUpSuccess = formParams => ({
  type: types.SIGN_UP_USER_SUCCESS, formParams
});

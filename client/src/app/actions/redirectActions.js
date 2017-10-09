import types from './actionTypes';

const setRedirectUrl = redirectUrl => ({
  type: types.SET_REDIRECT_URL, redirectUrl
});

export default setRedirectUrl;

import rootReducer from './rootReducer';
import types from '../actions/actionTypes';
import initialState from './initialState';

const appReducer = (state, action) => {
  if (action.type === types.SIGN_OUT_USER) {
    state = initialState;
  }
  return rootReducer(state, action);
};

export default appReducer;

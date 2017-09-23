import { combineReducers } from 'redux';
import user from './userReducer';
import redirectUrl from './redirectReducer';

const rootReducer = combineReducers({
  user,
  redirectUrl,
});

export default rootReducer;

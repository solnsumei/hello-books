import { combineReducers } from 'redux';
import user from './userReducer';
import redirectUrl from './redirectReducer';
import membershipTypes from './membershipTypeReducer';

const rootReducer = combineReducers({
  user,
  redirectUrl,
  membershipTypes,
});

export default rootReducer;

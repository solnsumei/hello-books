import { combineReducers } from 'redux';
import user from './userReducer';
import redirectUrl from './redirectReducer';
import membershipTypes from './membershipTypeReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({
  user,
  redirectUrl,
  membershipTypes,
  categories
});

export default rootReducer;

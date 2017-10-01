import { combineReducers } from 'redux';
import user from './userReducer';
import redirectUrl from './redirectReducer';
import membershipTypes from './membershipTypeReducer';
import categories from './categoryReducer';
import books from './bookReducer';

const rootReducer = combineReducers({
  user,
  redirectUrl,
  membershipTypes,
  categories,
  books
});

export default rootReducer;

import { combineReducers } from 'redux';
import user from './userReducer';
import redirectUrl from './redirectReducer';
import membershipTypes from './membershipTypeReducer';
import categories from './categoryReducer';
import books from './bookReducer';
import borrowedBooks from './borrowReducer';

const rootReducer = combineReducers({
  user,
  redirectUrl,
  membershipTypes,
  categories,
  books,
  borrowedBooks
});

export default rootReducer;

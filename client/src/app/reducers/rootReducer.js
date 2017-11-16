import { combineReducers } from 'redux';
import user from './userReducer';
import redirectUrl from './redirectReducer';
import memberships from './membershipReducer';
import categories from './categoryReducer';
import books from './bookReducer';
import borrowedBooks from './borrowReducer';

const rootReducer = combineReducers({
  user,
  redirectUrl,
  memberships,
  categories,
  books,
  borrowedBooks
});

export default rootReducer;

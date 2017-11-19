import { combineReducers } from 'redux';
import user from './userReducer';
import redirectUrl from './redirectReducer';
import memberships from './membershipReducer';
import categories from './categoryReducer';
import books from './bookReducer';
import borrowedBooks from './borrowReducer';
import notifications from './notificationReducer';

const rootReducer = combineReducers({
  user,
  redirectUrl,
  memberships,
  categories,
  books,
  borrowedBooks,
  notifications
});

export default rootReducer;

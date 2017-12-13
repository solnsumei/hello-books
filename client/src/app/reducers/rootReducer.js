import { combineReducers } from 'redux';
import user from './userReducer';
import memberships from './membershipReducer';
import categories from './categoryReducer';
import books from './bookReducer';
import borrowedBooks from './borrowReducer';
import notifications from './notificationReducer';
import itemCount from './itemCountReducer';

const rootReducer = combineReducers({
  user,
  memberships,
  categories,
  books,
  borrowedBooks,
  notifications,
  itemCount
});

export default rootReducer;

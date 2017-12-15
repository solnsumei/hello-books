import { combineReducers } from 'redux';
import user from './userReducer';
import memberships from './membershipReducer';
import categories from './categoryReducer';
import books from './bookReducer';
import borrowedBooks from './borrowReducer';
import notifications from './notificationReducer';
import itemCount from './itemCountReducer';

/**
 * rootReducer function
 * Combines all the reducers available for state
 * @param {Object} state 
 * @param {Object} action 
 * 
 * @returns {function} combineReducer
 */
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

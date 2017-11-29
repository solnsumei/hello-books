import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = initialState.itemCount, action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return { ...state, categories: action.categories.count };

    case types.LOAD_BOOKS_SUCCESS:
      return { ...state, books: action.books.count };

    case types.LOAD_BORROWED_BOOKS_SUCCESS:
      return { ...state, borrowedBooks: action.borrowedBooks.count };

    case types.LOAD_UNREAD_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: action.notifications.count };

    default:
      return state;
  }
}

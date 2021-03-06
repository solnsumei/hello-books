import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Book reducer
 * handles adding, fetching, updating and deleting books in the state
 * @param {object} state
 * @param {object} action
 * 
 * @returns {object} state
 */
export default function (state = initialState.books, action) {
  switch (action.type) {
    case types.LOAD_BOOKS_SUCCESS:
      return action.books.rows;

    case types.ADD_BOOK_SUCCESS:
      return [...state, action.book];

    case types.GET_BOOK_SUCCESS:
      return [...state.filter(book => book.id !== action.book.id), action.book];

    case types.UPDATE_BOOK_SUCCESS:
      return [...state.filter(book => book.id !== action.book.id), action.book];

    case types.ADD_STOCK_QUANTITY_SUCCESS:
      return [...state.filter(book => book.id !== action.book.id), action.book];

    case types.DELETE_BOOK_SUCCESS:
      return [...state.filter(book => book.id !== action.book.id)];

    default:
      return state;
  }
}

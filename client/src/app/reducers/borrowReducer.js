import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = initialState.borrowBooks, action) {
  switch (action.type) {
    case types.LOAD_BORROWED_BOOKS_SUCCESS:
      return action.books;

    case types.BORROW_BOOK_SUCCESS:
      return [...state,
        Object.assign({}, action.borrowedBook)
      ];

    case types.RETURN_BOOK_SUCCESS:
      return [...state.filter(book => book.id !== action.book.id),
        Object.assign({}, action.book)
      ];

    default:
      return state;
  }
}

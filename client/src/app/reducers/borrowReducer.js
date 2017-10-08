import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
export default function (state = initialState.borrowedBooks, action) {
  switch (action.type) {
    case types.LOAD_BORROWED_BOOKS_SUCCESS:
      return action.borrowedBooks;

    case types.BORROW_BOOK_SUCCESS:
      return [...state,
        Object.assign({}, action.borrowedBook)
      ];

    case types.RETURN_BOOK_SUCCESS:
      return [...state.filter(borrowedBook => borrowedBook.id !== action.returnedBook.id),
        Object.assign({}, action.returnedBook)
      ];

    default:
      return state;
  }
}

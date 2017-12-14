import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

export const borrowBookSuccess = borrowedBook => ({
  type: types.BORROW_BOOK_SUCCESS, borrowedBook
});

export const loadBorrowedBooksSuccess = borrowedBooks => ({
  type: types.LOAD_BORROWED_BOOKS_SUCCESS, borrowedBooks
});

export const returnBookSuccess = returnedBook => ({
  type: types.RETURN_BOOK_SUCCESS, returnedBook
});

export const actionError = () => ({
  type: types.FAILED_ACTION
});

/**
 * Fetches all borrowed books from the api endpoint
 * @param {string} page
 * @param {integer} limit
 * 
 * @returns {function} dispatch
 */
const loadBorrowedBooks = (page, limit) => (dispatch) => {
  const queryString = urlHelper('/user/history', page, limit);
  return axios.get(queryString)
    .then(({ data }) => dispatch(loadBorrowedBooksSuccess(data.borrowedBooks)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });
};

/**
 * Fetches all books that have not been returned for the api endpoint
 * @param {string} returned
 * 
 * @returns {function} dispatch
 */
const loadBooksNotReturned = returned => dispatch =>
  axios.get(`/user/history?returned=${returned}`)
    .then(({ data }) => dispatch(loadBorrowedBooksSuccess(data.borrowedBooks)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });


const borrowBook = bookId => dispatch =>
  axios.post('/book/borrow', { bookId })
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(borrowBookSuccess(data.borrowedBook));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });

const returnBook = (bookId, returned = null) => dispatch =>
  axios.put('/book/return',
    { bookId })
    .then(({ data }) => {
      toastr.success(data.message);
      if (returned) {
        return dispatch(loadBooksNotReturned(returned));
      }
      return dispatch(returnBookSuccess(data.returnedBook));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });

// entry point for all borrowing actions
const borrowActions = (action, ...params) => (dispatch) => {
  if (!authCheck(dispatch)) return dispatch(actionError());

  switch (action) {
    case types.LOAD_BORROWED_BOOKS:
      return dispatch(loadBorrowedBooks(params[0], params[1]));

    case types.LOAD_BOOKS_NOT_RETURNED:
      return dispatch(loadBooksNotReturned(params[0]));

    case types.BORROW_BOOK:
      return dispatch(borrowBook(params[0]));

    case types.RETURN_BOOK:
      return dispatch(returnBook(params[0], params[1]));

    default:
      return dispatch(actionError());
  }
};

export default borrowActions;

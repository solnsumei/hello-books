import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

/**
 * Triggers the borrow reducer to add a borrowed book to state
 * @param {Object} borrowedBook
 * 
 * @returns {Object} with a type as string and a borrowedBook object
 */
export const borrowBookSuccess = borrowedBook => ({
  type: types.BORROW_BOOK_SUCCESS, borrowedBook
});

/**
 * Triggers the borrow reducer to update the borrowed list
 * @param {array} borrowedBooks
 * 
 * @returns {Object} with a type as string and a borrowedBooks array
 */
export const loadBorrowedBooksSuccess = borrowedBooks => ({
  type: types.LOAD_BORROWED_BOOKS_SUCCESS, borrowedBooks
});

/**
 * Triggers the borrow reducer to update a borrowed book in state
 * @param {Object} returnedBook
 * 
 * @returns {Object} with a type as string and a borrowedBook object
 */
export const returnBookSuccess = returnedBook => ({
  type: types.RETURN_BOOK_SUCCESS, returnedBook
});

/**
 * Error action type to call when action fails
 * @param {void} null
 * 
 * @returns {string} type
 */
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

/**
 * Borrow a book api call
 * @param {integer} bookId
 * 
 * @returns {function} dispatch
 */
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

/**
 * Return a book api call
 * @param {integer} bookId
 * @param {boolean} returned
 * 
 * @returns {function} dispatch
 */
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

/**
 * Entry point for all borrow actions
 * @param {string} action - action to perform
 * @param {array} params - extra params that are optional
 * 
 * @returns {function} dispatch
 */
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

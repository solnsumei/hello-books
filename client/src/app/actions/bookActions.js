import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

/**
 * Triggers the book reducer to add book to state
 * @param {Object} book
 * 
 * @returns {Object} with a type as string and a book object
 */
export const addBookSuccess = book => ({
  type: types.ADD_BOOK_SUCCESS, book
});

/**
 * Triggers the book reducer to replace a book in state
 * @param {Object} book
 * 
 * @returns {Object} with a type as string and a book object
 */
export const getBookSuccess = book => ({
  type: types.GET_BOOK_SUCCESS, book
});

/**
 * Triggers the book reducer to update book array in state
 * @param {Object} books
 * 
 * @returns {Object} with a type as string and a books array
 */
export const loadBooksSuccess = books => ({
  type: types.LOAD_BOOKS_SUCCESS, books
});

/**
 * Triggers the book reducer to update a book in state
 * @param {Object} book
 * 
 * @returns {Object} with a type as string and a book object
 */
export const updateBookSuccess = book => ({
  type: types.UPDATE_BOOK_SUCCESS, book
});

/**
 * Updates the stock quantity of a book in state
 * @param {Object} book
 * 
 * @returns {Object} with a type as string and a book object
 */
export const addStockQuantitySuccess = book => ({
  type: types.ADD_STOCK_QUANTITY_SUCCESS, book
});

/**
 * Triggers the book reducer to remove a book in state
 * @param {Object} book
 * 
 * @returns {Object} with a type as string and a book object
 */
export const deleteBookSuccess = book => ({
  type: types.DELETE_BOOK_SUCCESS, book
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
 * Fetches all books for the api endpoint
 * @param {string} page
 * @param {integer} limit
 * 
 * @returns {function} dispatch
 */
const loadBooks = (page = null, limit = null) => (dispatch) => {
  const queryString = urlHelper('/books', page, limit);
  return axios.get(queryString)
    .then(({ data }) => dispatch(loadBooksSuccess(data.books)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });
};

/**
 * Fetches a single book for the api endpoint
 * @param {string} bookId
 * 
 * @returns {function} dispatch
 */
const getBook = bookId => dispatch =>
  axios.get(`/books/${bookId}`)
    .then(({ data }) => dispatch(getBookSuccess(data.book)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });

/**
 * Creates or updates a book
 * @param {Object} book
 * 
 * @returns {function} dispatch
 */
const saveOrUpdateBook = book => (dispatch) => {
  if (book.id) {
    // updates a book
    return axios.put(`/books/${book.id}`, book)
      .then(({ data }) => {
        toastr.success(data.message);
        return dispatch(updateBookSuccess(data.book));
      });
  }

  // creates a book
  return axios.post('/books', book)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(addBookSuccess(data.book));
    });
};

/**
 * Adds quantity to a book api call
 * @param {Object} book - book to add quantity to
 * @param {quantity} quantity - quatity to add
 * 
 * @returns {function} dispatch
 */
const addStockQuantity = (book, quantity) => dispatch =>
  axios.post(`/books/${book.id}`, { quantity })
    .then(({ data }) => {
      book.stockQuantity = parseInt(book.stockQuantity, 10) + parseInt(quantity, 10);
      toastr.success(data.message);
      return dispatch(addStockQuantitySuccess(book));
    });

/**
 * Delete a book
 * @param {Object} book - book to add quantity to
 * 
 * @returns {function} dispatch
 */
const deleteBook = book => dispatch =>
  axios.delete(`/books/${book.id}`)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(deleteBookSuccess(book));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });

/**
 * Entry point for all book actions
 * @param {string} action - action to perform
 * @param {array} params - extra params that are optional
 * 
 * @returns {function} dispatch
 */
const bookActions = (action, ...params) => (dispatch) => {
  if (!authCheck(dispatch)) return dispatch(actionError());

  switch (action) {
    case types.LOAD_BOOKS:
      return dispatch(loadBooks(params[0], params[1]));

    case types.GET_BOOK:
      return dispatch(getBook(params[0]));

    case types.SAVE_OR_UPDATE_BOOK:
      return dispatch(saveOrUpdateBook(params[0]));

    case types.ADD_STOCK_QUANTITY:
      return dispatch(addStockQuantity(params[0], params[1]));

    case types.DELETE_BOOK:
      return dispatch(deleteBook(params[0]));

    default:
      return dispatch(actionError());
  }
};

export default bookActions;

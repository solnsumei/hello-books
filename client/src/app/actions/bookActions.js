import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

export const addBookSuccess = book => ({
  type: types.ADD_BOOK_SUCCESS, book
});

export const getBookSuccess = book => ({
  type: types.GET_BOOK_SUCCESS, book
});

export const loadBooksSuccess = books => ({
  type: types.LOAD_BOOKS_SUCCESS, books
});

export const updateBookSuccess = book => ({
  type: types.UPDATE_BOOK_SUCCESS, book
});

export const addStockQuantitySuccess = book => ({
  type: types.ADD_STOCK_QUANTITY_SUCCESS, book
});

export const deleteBookSuccess = book => ({
  type: types.DELETE_BOOK_SUCCESS, book
});

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

  // get a single book
const getBook = bookId => dispatch =>
  axios.get(`/books/${bookId}`)
    .then(({ data }) => dispatch(getBookSuccess(data.book)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
      return dispatch(actionError());
    });

// save or update book
const saveOrUpdateBook = book => (dispatch) => {
  if (book.id) {
    return axios.put(`/books/${book.id}`, book)
      .then(({ data }) => {
        toastr.success(data.message);
        return dispatch(updateBookSuccess(data.book));
      });
  }

  return axios.post('/books', book)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(addBookSuccess(data.book));
    });
};

// add quantity to book stock
const addStockQuantity = (book, quantity) => dispatch =>
  axios.post(`/books/${book.id}`, { quantity })
    .then(({ data }) => {
      book.stockQuantity = parseInt(book.stockQuantity, 10) + parseInt(quantity, 10);
      toastr.success(data.message);
      return dispatch(addStockQuantitySuccess(book));
    });

// delete book
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

// entry point for all book actions
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

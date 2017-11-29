import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

const addBookSuccess = book => ({
  type: types.ADD_BOOK_SUCCESS, book
});

const getBookSuccess = book => ({
  type: types.GET_BOOK_SUCCESS, book
});

const loadBooksSuccess = books => ({
  type: types.LOAD_BOOKS_SUCCESS, books
});

const updateBookSuccess = book => ({
  type: types.UPDATE_BOOK_SUCCESS, book
});

const addStockQuantitySuccess = book => ({
  type: types.ADD_STOCK_QUANTITY_SUCCESS, book
});

const deleteBookSuccess = book => ({
  type: types.DELETE_BOOK_SUCCESS, book
});

// load all books
const loadBooks = (page, limit) => (dispatch) => {
  const queryString = urlHelper('/books', page, limit);
  return axios.get(queryString)
    .then(({ data }) => dispatch(loadBooksSuccess(data.books)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });
};

  // get a single book
const getBook = bookId => dispatch =>
  axios.get(`/books/${bookId}`)
    .then(({ data }) => dispatch(getBookSuccess(data.book)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
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
      return dispatch(loadBooks());
    })
    .catch(({ response }) => {
      if (response) {
        toastr.error(response.data.error);
      }
    });

// entry point for all book actions
const bookActions = (action, ...params) => (dispatch) => {
  if (!authCheck(dispatch)) return;

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
      break;
  }
};

export default bookActions;

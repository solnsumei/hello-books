import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';

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
const loadBooks = headers => dispatch =>
  axios.get('/books', headers)
    .then(({ data }) => dispatch(loadBooksSuccess(data.books)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

  // get a single book
const getBook = (bookId, headers) => dispatch =>
  axios.get(`/books/${bookId}`, headers)
    .then(({ data }) => dispatch(getBookSuccess(data.book)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

// save or update book
const saveOrUpdateBook = (book, headers) => (dispatch) => {
  if (book.id) {
    return axios.put(`/books/${book.id}`,
      book, headers)
      .then(({ data }) => {
        toastr.success(data.message);
        return dispatch(updateBookSuccess(data.book));
      });
  }

  return axios.post('/books', book, headers)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(addBookSuccess(data.book));
    });
};

// add quantity to book stock
const addStockQuantity = (book, quantity, headers) => dispatch =>
  axios.post(`/books/${book.id}`, { quantity }, headers)
    .then(({ data }) => {
      book.stockQuantity = parseInt(book.stockQuantity, 10) + parseInt(quantity, 10);
      toastr.success(data.message);
      return dispatch(addStockQuantitySuccess(book));
    });

// delete book
const deleteBook = (book, headers) => dispatch =>
  axios.delete(`/books/${book.id}`, headers)
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(deleteBookSuccess(data.book));
    })
    .catch(({ response }) => {
      if (response) {
        toastr.error(response.data.error);
      }
    });

// entry point for all book actions
const bookActions = (action, book = null, bookId = null, quantity = null) => (dispatch) => {
  const headers = authCheck(dispatch);

  switch (action) {
    case types.LOAD_BOOKS:
      return dispatch(loadBooks(headers));

    case types.GET_BOOK:
      return dispatch(getBook(bookId, headers));

    case types.SAVE_OR_UPDATE_BOOK:
      return dispatch(saveOrUpdateBook(book, headers));

    case types.ADD_STOCK_QUANTITY:
      return dispatch(addStockQuantity(book, quantity, headers));

    case types.DELETE_BOOK:
      return dispatch(deleteBook(book, headers));

    default:
      break;
  }
};

export default bookActions;

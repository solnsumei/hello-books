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
const loadBooks = () => dispatch =>
  axios.get('/books')
    .then(({ data }) => dispatch(loadBooksSuccess(data.books)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

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
      return dispatch(deleteBookSuccess(data.book));
    })
    .catch(({ response }) => {
      if (response) {
        toastr.error(response.data.error);
      }
    });

// entry point for all book actions
const bookActions = (action, book = null, bookId = null, quantity = null) => (dispatch) => {
  if (!authCheck(dispatch)) return;

  switch (action) {
    case types.LOAD_BOOKS:
      return dispatch(loadBooks());

    case types.GET_BOOK:
      return dispatch(getBook(bookId));

    case types.SAVE_OR_UPDATE_BOOK:
      return dispatch(saveOrUpdateBook(book));

    case types.ADD_STOCK_QUANTITY:
      return dispatch(addStockQuantity(book, quantity));

    case types.DELETE_BOOK:
      return dispatch(deleteBook(book));

    default:
      break;
  }
};

export default bookActions;

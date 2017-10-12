import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';

const addBookSuccess = book => ({
  type: types.ADD_BOOK_SUCCESS, book
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
  axios.get('/api/v1/books', headers)
    .then(({ data }) => dispatch(loadBooksSuccess(data.books)))
    .catch((error) => {
      throw (error);
    });

// save or update book
const saveOrUpdateBook = (book, headers) => (dispatch) => {
  if (book.id) {
    return axios.put(`/api/v1/books/${book.id}`,
      book, headers)
      .then(({ data }) => dispatch(updateBookSuccess(data.book)));
  }

  return axios.post('/api/v1/books', book, headers)
    .then(({ data }) => dispatch(addBookSuccess(data.book)));
};

// add quantity to book stock
const addStockQuantity = (book, quantity, headers) => dispatch =>
  axios.post(`/api/v1/books/${book.id}`, { quantity }, headers)
    .then(({ data }) => {
      book.stockQuantity = parseInt(book.stockQuantity, 10) + parseInt(quantity, 10);
      return dispatch(addStockQuantitySuccess(book));
    });

// delete book
const deleteBook = book => dispatch =>
  axios({
    method: 'delete',
    url: '/api/v1/books',
    data: { bookId: book.id },
    headers: { 'x-token': localStorage.getItem(types.USER_TOKEN) },
  })
    .then(({ data }) => {
      toastr.success('Book was deleted successfully');
      return dispatch(deleteBookSuccess(data.book));
    })
    .catch(({ response }) => {
      if (response) {
        toastr.error(response.data.error);
      }
    });

// entry point for all book actions
const bookActions = (action, book = null, quantity = null) => (dispatch) => {
  const headers = authCheck(dispatch);

  switch (action) {
    case types.LOAD_BOOKS:
      return dispatch(loadBooks(headers));

    case types.SAVE_OR_UPDATE_BOOK:
      return dispatch(saveOrUpdateBook(book, headers));

    case types.ADD_STOCK_QUANTITY:
      return dispatch(addStockQuantity(book, quantity, headers));

    case types.DELETE_BOOK:
      return dispatch(deleteBook(book));

    default:
      break;
  }
};

export default bookActions;

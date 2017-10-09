import axios from 'axios';
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

const loadBooks = () => (dispatch) => {
  const headers = authCheck(dispatch);
  return axios.get('/api/v1/books', headers)
    .then(({ data }) => dispatch(loadBooksSuccess(data)))
    .catch((error) => {
      throw (error);
    });
};

const saveBook = book => (dispatch) => {
  const headers = authCheck(dispatch);
  if (book.id) {
    return axios.put(`/api/v1/books/${book.id}`,
      book, headers)
      .then(({ data }) => dispatch(updateBookSuccess(data.book)));
  }

  return axios.post('/api/v1/books', book, headers)
    .then(({ data }) => dispatch(addBookSuccess(data.book)));
};

const addStockQuantity = (book, quantity) => (dispatch) => {
  const headers = authCheck(dispatch);
  return axios.post(`/api/v1/books/${book.id}`, { quantity }, headers)
    .then(({ data }) => {
      book.stockQuantity = Number.parseInt(book.stockQuantity, 10) + Number.parseInt(quantity, 10);
      return dispatch(addStockQuantitySuccess(book));
    });
};

const deleteBook = book => (dispatch) => {
  const headers = authCheck(dispatch);
  return axios.delete('/api/v1/books', headers)
    .then(({ data }) => dispatch(deleteBookSuccess(data.book)));
};

export { loadBooks, saveBook, addStockQuantity, deleteBook };

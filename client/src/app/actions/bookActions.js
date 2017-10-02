import axios from 'axios';
import types from './actionTypes';
import { constants } from '../helpers/constants';

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

const loadBooks = () => dispatch =>
  axios.get('/api/v1/books', constants())
    .then(({ data }) => dispatch(loadBooksSuccess(data)))
    .catch((error) => {
      throw (error);
    });

const saveBook = book => (dispatch) => {
  if (book.id) {
    return axios.put(`/api/v1/books/${book.id}`,
      book, constants())
      .then(({ data }) => dispatch(updateBookSuccess(data.book)));
  }

  return axios.post('/api/v1/books', book, constants())
    .then(({ data }) => dispatch(addBookSuccess(data.book)));
};

const addStockQuantity = (book, quantity) => dispatch =>
  axios.post(`/api/v1/books/${book.id}`, quantity, constants())
    .then(({ data }) => {
      book.stockQuantity += quantity;
      return dispatch(addStockQuantitySuccess(book));
    });

export { loadBooks, saveBook, addStockQuantity };

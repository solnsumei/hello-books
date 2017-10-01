import axios from 'axios';
import types from './actionTypes';

const addBookSuccess = book => ({
  type: types.ADD_BOOK_SUCCESS, book
});

const loadBooksSuccess = books => ({
  type: types.LOAD_BOOKS_SUCCESS, books
});

const updateBookSuccess = book => ({
  type: types.UPDATE_CATEGORY_SUCCESS, book
});

const loadBooks = () => (dispatch) => {
  const token = localStorage.getItem(types.USER_TOKEN);

  return axios.get('/api/v1/books', { headers: { 'x-token': token } })
    .then(({ data }) => dispatch(loadBooksSuccess(data)))
    .catch((error) => {
      throw (error);
    });
};

const saveBook = book => (dispatch) => {
  const token = localStorage.getItem(types.USER_TOKEN);

  if (book.id) {
    return axios.put(`/api/v1/books/${book.id}`,
      book, { headers: { 'x-token': token } })
      .then(({ data }) => dispatch(updateBookSuccess(data.book)));
  }

  return axios.post('/api/v1/book', book, { headers: { 'x-token': token } })
    .then(({ data }) => dispatch(addBookSuccess(data.book)));
};

export { loadBooks, saveBook };

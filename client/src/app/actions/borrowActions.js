import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';

const borrowBookSuccess = borrowedBook => ({
  type: types.BORROW_BOOK_SUCCESS, borrowedBook
});

const loadBorrowedBooksSuccess = borrowedBooks => ({
  type: types.LOAD_BORROWED_BOOKS_SUCCESS, borrowedBooks
});

const returnBookSuccess = returnedBook => ({
  type: types.RETURN_BOOK_SUCCESS, returnedBook
});

const loadBorrowedBooks = user => (dispatch) => {
  const headers = authCheck(dispatch);
  return axios.get(`/api/v1/users/${user.id}/books`, headers)
    .then(({ data }) => dispatch(loadBorrowedBooksSuccess(data)))
    .catch((error) => {
      throw (error);
    });
};

const borrowBook = (user, bookId) => (dispatch) => {
  const headers = authCheck(dispatch);
  return axios.post(`/api/v1/users/${user.id}/books`,
    { bookId }, headers)
    .then(({ data }) => {
      toastr.success(data.message);
      dispatch(borrowBookSuccess(data.borrowedBook));
    });
};

const returnBook = (user, bookId) => (dispatch) => {
  const headers = authCheck(dispatch);
  return axios.put(`/api/v1/users/${user.id}/books`,
    { bookId }, headers)
    .then(({ data }) => {
      toastr.success(data.message);
      dispatch(returnBookSuccess(data.returnedBook));
    });
};

export { loadBorrowedBooks, borrowBook, returnBook };

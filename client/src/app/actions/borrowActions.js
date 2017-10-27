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

const loadBorrowedBooks = (user, headers) => dispatch =>
  axios.get(`/users/${user.id}/books`, headers)
    .then(({ data }) => dispatch(loadBorrowedBooksSuccess(data.borrowedBooks)))
    .catch(({ response }) => {
      toastr(response.data.error);
    });

const borrowBook = (user, bookId, headers) => dispatch =>
  axios.post(`/users/${user.id}/books`,
    { bookId }, headers)
    .then(({ data }) => {
      toastr.success(data.message);
      dispatch(borrowBookSuccess(data.borrowedBook));
    })
    .catch(({ response }) => {
      toastr(response.data.error);
    });

const returnBook = (user, bookId, headers) => dispatch =>
  axios.put(`/users/${user.id}/books`,
    { bookId }, headers)
    .then(({ data }) => {
      toastr.success(data.message);
      dispatch(returnBookSuccess(data.returnedBook));
    })
    .catch(({ response }) => {
      toastr(response.data.error);
    });

// entry point for all borrowing actions
const borrowActions = (action, user, bookId = null) => (dispatch) => {
  const headers = authCheck(dispatch);

  switch (action) {
    case types.LOAD_BORROWED_BOOKS:
      return dispatch(loadBorrowedBooks(user, headers));

    case types.BORROW_BOOK:
      return dispatch(borrowBook(user, bookId, headers));

    case types.RETURN_BOOK:
      return dispatch(returnBook(user, bookId, headers));

    default:
      break;
  }
};

export default borrowActions;

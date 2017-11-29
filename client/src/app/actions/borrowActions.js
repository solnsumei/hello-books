import axios from 'axios';
import toastr from 'toastr';
import types from './actionTypes';
import { authCheck } from './userActions';
import urlHelper from '../helpers/urlHelper';

const borrowBookSuccess = borrowedBook => ({
  type: types.BORROW_BOOK_SUCCESS, borrowedBook
});

const loadBorrowedBooksSuccess = borrowedBooks => ({
  type: types.LOAD_BORROWED_BOOKS_SUCCESS, borrowedBooks
});

const returnBookSuccess = returnedBook => ({
  type: types.RETURN_BOOK_SUCCESS, returnedBook
});

const loadBorrowedBooks = (page, limit) => (dispatch) => {
  const queryString = urlHelper('/user/history', page, limit);
  return axios.get(queryString)
    .then(({ data }) => dispatch(loadBorrowedBooksSuccess(data.borrowedBooks)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });
};

const loadBooksNotReturned = returned => dispatch =>
  axios.get(`/user/history?returned=${returned}`)
    .then(({ data }) => dispatch(loadBorrowedBooksSuccess(data.borrowedBooks)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

const borrowBook = bookId => dispatch =>
  axios.post('/book/borrow', { bookId })
    .then(({ data }) => {
      toastr.success(data.message);
      return dispatch(borrowBookSuccess(data.borrowedBook));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

const returnBook = (bookId, returned = null) => dispatch =>
  axios.put('/book/return',
    { bookId })
    .then(({ data }) => {
      toastr.success(data.message);
      if (returned) {
        return dispatch(loadBooksNotReturned(returned));
      }
      return dispatch(returnBookSuccess(data.returnedBook));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

// entry point for all borrowing actions
const borrowActions = (action, ...params) => (dispatch) => {
  if (!authCheck(dispatch)) return;

  switch (action) {
    case types.LOAD_BORROWED_BOOKS:
      return dispatch(loadBorrowedBooks(params[0], params[1]));

    case types.LOAD_BOOKS_NOT_RETURNED:
      return dispatch(loadBooksNotReturned(params[0]));

    case types.BORROW_BOOK:
      return dispatch(borrowBook(params[0]));

    case types.RETURN_BOOK:
      return dispatch(returnBook(params[0], params[1]));

    default:
      break;
  }
};

export default borrowActions;

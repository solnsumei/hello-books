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

const loadBorrowedBooks = () => dispatch =>
  axios.get('/user/history')
    .then(({ data }) => dispatch(loadBorrowedBooksSuccess(data.borrowedBooks)))
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

const borrowBook = bookId => dispatch =>
  axios.post('/book/borrow', { bookId })
    .then(({ data }) => {
      toastr.success(data.message);
      dispatch(borrowBookSuccess(data.borrowedBook));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

const returnBook = bookId => dispatch =>
  axios.put('/book/return',
    { bookId })
    .then(({ data }) => {
      toastr.success(data.message);
      dispatch(returnBookSuccess(data.returnedBook));
    })
    .catch(({ response }) => {
      toastr.error(response.data.error);
    });

// entry point for all borrowing actions
const borrowActions = (action, bookId = null) => (dispatch) => {
  if (!authCheck(dispatch)) return;

  switch (action) {
    case types.LOAD_BORROWED_BOOKS:
      return dispatch(loadBorrowedBooks());

    case types.BORROW_BOOK:
      return dispatch(borrowBook(bookId));

    case types.RETURN_BOOK:
      return dispatch(returnBook(bookId));

    default:
      break;
  }
};

export default borrowActions;

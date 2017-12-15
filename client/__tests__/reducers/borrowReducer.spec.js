import expect from 'expect';
import reducer from '../../src/app/reducers/borrowReducer';
import types from '../../src/app/actions/actionTypes';
import mockItems from '../__mocks__/mockItems';
import { borrowBookSuccess, returnBookSuccess, loadBorrowedBooksSuccess }
  from '../../src/app/actions/borrowActions';

let initialState = [];
let newState;

describe('Borrow reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('should handle LOAD_BORROWED_BOOKS_SUCCESS', () => {
    newState = reducer(initialState, loadBorrowedBooksSuccess(mockItems.borrowedBooks));
    expect(newState).toEqual(mockItems.borrowedBooks.rows);
  });

  it('should handle BORROW_BOOK_SUCCESS', () => {
    newState = reducer(initialState, borrowBookSuccess(mockItems.borrowedBook));
    expect(newState).toEqual([mockItems.borrowedBook]);
  });

  it('should handle RETURN_BOOK_SUCCESS', () => {
    initialState = [mockItems.borrowedBook];
    newState = reducer(initialState, returnBookSuccess(mockItems.returnedBook));
    expect(newState).toEqual([mockItems.returnedBook]);
  });
});

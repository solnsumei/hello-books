import expect from 'expect';
import reducer from '../../src/app/reducers/bookReducer';
import types from '../../src/app/actions/actionTypes';
import mockItems from '../__mocks__/mockItems';
import { loadBooksSuccess, addBookSuccess, updateBookSuccess,
  deleteBookSuccess, addStockQuantitySuccess, getBookSuccess } from '../../src/app/actions/bookActions';

let initialState = [];
let newState;

describe('Book reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('should handle LOAD_BOOKS_SUCCESS', () => {
    newState = reducer(initialState, loadBooksSuccess(mockItems.books));
    expect(newState).toEqual(mockItems.books.rows);
  });

  it('should handle ADD_BOOK_SUCCESS', () => {
    newState = reducer(initialState, addBookSuccess(mockItems.book));
    expect(newState).toEqual([mockItems.book]);
  });

  it('should handle GET_BOOK_SUCCESS', () => {
    initialState = [{ id: 1, title: 'Fake Book' }];
    newState = reducer(initialState, getBookSuccess(mockItems.book));
    expect(newState).toEqual([mockItems.book]);
  });

  it('should handle ADD_STOCK_QUANTITY_SUCCESS', () => {
    initialState = [{ id: 1, title: 'Book of Android' }];
    newState = reducer(initialState, addStockQuantitySuccess(mockItems.book));
    expect(newState).toEqual([mockItems.book]);
  });

  it('should handle UPDATE_BOOK_SUCCESS', () => {
    initialState = [{ id: 1, title: 'Fake Book' }];
    newState = reducer(initialState, updateBookSuccess(mockItems.book));
    expect(newState).toEqual([mockItems.book]);
  });

  it('should handle DELETE_BOOK_SUCCESS', () => {
    initialState = [mockItems.book];
    newState = reducer(initialState, deleteBookSuccess(mockItems.book));
    expect(newState).toEqual([]);
  });
});

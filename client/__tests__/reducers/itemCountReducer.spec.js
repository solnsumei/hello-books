import expect from 'expect';
import reducer from '../../src/app/reducers/itemCountReducer';
import types from '../../src/app/actions/actionTypes';
import mockItems from '../__mocks__/mockItems';
import globalState from '../../src/app/reducers/initialState';
import { loadBorrowedBooksSuccess } from '../../src/app/actions/borrowActions';
import { loadBooksSuccess } from '../../src/app/actions/bookActions';
import { loadCategoriesSuccess } from '../../src/app/actions/categoryActions';
import { loadUnreadNotificationSuccess, loadUnreadNotificationsSuccess } from '../../src/app/actions/notificationActions';

let newState;
const initialState = globalState.itemCount;

describe('ItemCount reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('should handle LOAD_BORROWED_BOOKS_SUCCESS', () => {
    newState = reducer(initialState, loadBorrowedBooksSuccess(mockItems.borrowedBooks));
    expect(newState.borrowedBooks).toEqual(mockItems.borrowedBooks.count);
  });

  it('should handle LOAD_BOOKS_SUCCESS', () => {
    newState = reducer(initialState, loadBooksSuccess(mockItems.books));
    expect(newState.books).toEqual(mockItems.books.count);
  });

  it('should handle LOAD_CATEGORIES_SUCCESS', () => {
    newState = reducer(initialState, loadCategoriesSuccess(mockItems.categories));
    expect(newState.categories).toEqual(mockItems.categories.count);
  });

  it('should handle LOAD_UNREAD_NOTIFICATION_SUCCESS', () => {
    newState = reducer(initialState, loadUnreadNotificationsSuccess(mockItems.notifications));
    expect(newState.notifications).toEqual(mockItems.notifications.count);
  });
});

import expect from 'expect';
import reducer from '../../src/app/reducers/notificationReducer';
import types from '../../src/app/actions/actionTypes';
import mockItems from '../__mocks__/mockItems';
import { readNotificationSuccess, loadUnreadNotificationsSuccess }
  from '../../src/app/actions/notificationActions';

let initialState = [];
let newState;

describe('Notification reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('should handle LOAD_UNREAD_NOTIFICATION_SUCCESS', () => {
    newState = reducer(initialState, loadUnreadNotificationsSuccess(mockItems.notifications));
    expect(newState).toEqual(mockItems.borrowedBooks.rows);
  });

  it('should handle READ_NOTIFICATION_SUCCESS', () => {
    initialState = [mockItems.notification];
    newState = reducer(initialState, readNotificationSuccess(mockItems.notification));
    expect(newState).toEqual([]);
  });
});

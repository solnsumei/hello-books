import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '../../src/app/actions/actionTypes';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockFailedAuth from '../__mocks__/mockFailedAuth';
import mockItems from '../__mocks__/mockItems';
import notificationActions from '../../src/app/actions/notificationActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- notificationActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    return mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // load notifications action
  describe('loadUnreadNotifications', () => {
    it('should create a LOAD_UNREAD_NOTIFICATIONS_SUCCESS action', (done) => {
      moxios.stubRequest('/notifications', {
        status: 200,
        response: {
          success: true,
          message: 'notifications loaded successfully',
          notifications: mockItems.notifications
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_UNREAD_NOTIFICATIONS_SUCCESS,
          notifications: mockItems.notifications
        }
      ];

      store.dispatch(notificationActions(types.LOAD_UNREAD_NOTIFICATIONS))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed load notifications request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/notifications', {
        status: 400,
        response: {
          success: false,
          error: 'There was an error'
        }
      });

      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(notificationActions(types.LOAD_UNREAD_NOTIFICATIONS))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // get notification action
  describe('readNotification', () => {
    it('should create a READ_NOTIFICATION_SUCCESS action', (done) => {
      moxios.stubRequest('/notifications/1', {
        status: 200,
        response: {
          success: true,
          notification: mockItems.notification
        }
      });

      const expectedActions = [
        {
          type: types.READ_NOTIFICATION_SUCCESS,
          notification: {
            id: 1,
          }
        }
      ];

      store.dispatch(notificationActions(types.READ_NOTIFICATION, 1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed load notification request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/notifications/1', {
        status: 400,
        response: {
          success: false,
          error: 'There was an error'
        }
      });

      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(notificationActions(types.READ_NOTIFICATION, 1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Empty notification action', () => {
    it('should create a FAILED_ACTION action', (done) => {
      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(notificationActions('AEE'));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });

  describe('Failed Authentication', () => {
    it('should create a FAILED_ACTION action', (done) => {
      mockFailedAuth();
      const expectedActions = [
        {
          type: types.SIGN_OUT_USER
        },
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(notificationActions('AEE'));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });
});

import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '../../src/app/actions/actionTypes';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockFailedAuth from '../__mocks__/mockFailedAuth';
import mockItems from '../__mocks__/mockItems';
import membershipActions from '../../src/app/actions/membershipActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- membershipActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    return mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // load memberships action
  describe('loadMemberships Types', () => {
    it('should create a LOAD_MEMBERSHIP_TYPES_SUCCESS action', (done) => {
      moxios.stubRequest('/membership', {
        status: 200,
        response: {
          success: true,
          message: 'memberships loaded successfully',
          memberships: mockItems.memberships
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_MEMBERSHIP_TYPES_SUCCESS,
          memberships: mockItems.memberships
        }
      ];

      store.dispatch(membershipActions(types.LOAD_MEMBERSHIP_TYPES))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed load memberships request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/membership', {
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

      store.dispatch(membershipActions(types.LOAD_MEMBERSHIP_TYPES))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('updateMembership Type', () => {
    it('should create a UPDATE_MEMBERSHIP_TYPE_SUCCESS action', (done) => {
      moxios.stubRequest('/membership/1', {
        status: 200,
        response: {
          success: true,
          membership: mockItems.membership
        }
      });

      const expectedActions = [
        {
          type: types.UPDATE_MEMBERSHIP_TYPE_SUCCESS,
          membership: mockItems.membership
        }
      ];

      store.dispatch(membershipActions(types.UPDATE_MEMBERSHIP_TYPE, mockItems.membership))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('Empty membership action', () => {
    it('should create a FAILED_ACTION action', (done) => {
      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(membershipActions('AEE'));
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

      store.dispatch(membershipActions('AEE'));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });
});

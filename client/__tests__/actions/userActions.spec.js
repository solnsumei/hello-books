import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '../../src/app/actions/actionTypes';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockFailedAuth, { mockFailedAuthToken } from '../__mocks__/mockFailedAuth';
import mockItems from '../__mocks__/mockItems';
import {
  loginRequest, userSignUpRequest, updateUserAccount, forgotPassword, resetPassword,
  checkAuthentication, logoutRequest, authCheck, getUserProfile, changeUserPassword
} from '../../src/app/actions/userActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- userActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    // return mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // Sign up User Action
  describe('User sign up action', () => {
    it('should create a USER_AUTH_SUCCESS action', (done) => {
      moxios.stubRequest('/users/signup', {
        status: 201,
        response: {
          success: true,
          message: 'User sign up successful',
          user: mockItems.user
        }
      });

      const expectedActions = [
        {
          type: types.USER_AUTH_SUCCESS,
          user: mockItems.user
        }
      ];

      store.dispatch(userSignUpRequest(mockItems.user))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Sign in User Action
  describe('User sign in action', () => {
    it('should create a USER_AUTH_SUCCESS action', (done) => {
      moxios.stubRequest('/users/signin', {
        status: 200,
        response: {
          success: true,
          message: 'Welcome back',
          user: mockItems.user
        }
      });

      const expectedActions = [
        {
          type: types.USER_AUTH_SUCCESS,
          user: mockItems.user
        }
      ];

      store.dispatch(loginRequest(mockItems.user))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Forgot password Action
  describe('Forgot Password action', () => {
    it('should create a RESET_PASSWORD_SUCCESS action', (done) => {
      moxios.stubRequest('/users/forgot-password', {
        status: 200,
        response: {
          success: true,
          message: 'Forgot password success'
        }
      });

      const expectedActions = [
        {
          type: types.RESET_PASSWORD_SUCCESS
        }
      ];

      store.dispatch(forgotPassword(mockItems.user))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Reset password Action
  describe('Reset Password action', () => {
    it('should create a RESET_PASSWORD_SUCCESS action', (done) => {
      moxios.stubRequest('/users/reset-password?token=thhhshs', {
        status: 200,
        response: {
          success: true,
          message: 'Reset password success'
        }
      });

      const expectedActions = [
        {
          type: types.RESET_PASSWORD_SUCCESS
        }
      ];

      store.dispatch(resetPassword(mockItems.user, 'thhhshs'))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Authenticated User Actions
  describe('User normal user actions with token', () => {
    beforeEach(() => {
      mockAuthCheck();
    });

    // Get user profile
    describe('Get user profile', () => {
      it('should create a GET_USER_PROFILE_SUCCESS action', (done) => {
        moxios.stubRequest('/user/profile', {
          status: 200,
          response: {
            success: true,
            user: mockItems.user
          }
        });

        const expectedActions = [
          {
            type: types.GET_USER_PROFILE_SUCCESS,
            user: mockItems.user
          }
        ];

        store.dispatch(getUserProfile())
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
            done();
          });
      });
    });

    // Update user profile
    describe('Update user profile', () => {
      it('should create a GET_USER_PROFILE_SUCCESS action', (done) => {
        moxios.stubRequest('/user/profile', {
          status: 200,
          response: {
            success: true,
            user: mockItems.user
          }
        });

        moxios.stubRequest('/user/profile', {
          status: 200,
          response: {
            success: true,
            user: mockItems.user
          }
        });

        const expectedActions = [
          {
            type: types.GET_USER_PROFILE_SUCCESS,
            user: mockItems.user
          }
        ];

        store.dispatch(updateUserAccount(mockItems.user))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
            done();
          });
      });
    });

    // Change password
    describe('Change password', () => {
      it('should create a CHANGE_PASSWORD_SUCCESS action', (done) => {
        moxios.stubRequest('/user/change-password', {
          status: 200,
          response: {
            success: true,
            message: 'User password changed'
          }
        });

        const expectedActions = [
          {
            type: types.CHANGE_PASSWORD_SUCCESS,
          }
        ];

        store.dispatch(changeUserPassword(mockItems.user))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
            done();
          });
      });
    });

    // User log out
    describe('User log out', () => {
      it('should create a SIGNOUT_USER action', (done) => {
        const expectedActions = [
          {
            type: types.SIGN_OUT_USER,
          }
        ];

        store.dispatch(logoutRequest());
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    // check authentications failure
    describe('Check authentication failure', () => {
      it('should create a USER_AUTH_FAILED action on failure', (done) => {
        mockFailedAuth();
        const expectedActions = [
          {
            type: types.USER_AUTH_FAILED,
          }
        ];

        store.dispatch(checkAuthentication());
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    // check authentications success
    describe('Check authentication success', () => {
      it('should create a USER_AUTH_SUCCESS action on failure', (done) => {
        const expectedActions = [
          {
            type: types.USER_AUTH_SUCCESS,
            user: mockItems.auth
          }
        ];

        store.dispatch(checkAuthentication());
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    // Auth Check function failure test
    describe('Auth Check & Check Token', () => {
      it('should create a SIGN_OUT_USER action', (done) => {
        mockFailedAuthToken();
        const expectedActions = [
          {
            type: types.SIGN_OUT_USER,
          }
        ];

        store.dispatch(changeUserPassword(mockItems.user));
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });
  });
});


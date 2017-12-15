import expect from 'expect';
import reducer from '../../src/app/reducers/userReducer';
import types from '../../src/app/actions/actionTypes';
import mockItems from '../__mocks__/mockItems';

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle USER_AUTH_FAILED', () => {
    const userAuthFaileAction = {
      type: types.USER_AUTH_FAILED
    };
    expect(reducer({}, userAuthFaileAction)).toEqual({});
  });

  it('should handle USER_AUTH_SUCCESS', () => {
    const userAuthSuccessAction = {
      type: types.USER_AUTH_SUCCESS,
      user: mockItems.user
    };
    expect(reducer({}, userAuthSuccessAction)).toEqual(mockItems.user);
  });

  it('should handle GET_USER_PROFILE_SUCCESS', () => {
    const getUserProfileSuccessAction = {
      type: types.GET_USER_PROFILE_SUCCESS,
      user: mockItems.user
    };
    expect(reducer({}, getUserProfileSuccessAction)).toEqual(mockItems.user);
  });
});

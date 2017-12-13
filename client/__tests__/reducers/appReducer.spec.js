import expect from 'expect';
import reducer from '../../src/app/reducers/appReducer';
import initialState from '../../src/app/reducers/initialState';
import types from '../../src/app/actions/actionTypes';
import { signOutUser } from '../../src/app/actions/userActions';

let newState;

describe('Book reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('should handle SIGN_OUT_USER', () => {
    initialState.user = { id: 1 };
    newState = reducer(initialState, signOutUser());
    expect(newState).toEqual(initialState);
  });
});

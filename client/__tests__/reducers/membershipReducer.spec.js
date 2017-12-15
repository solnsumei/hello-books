import expect from 'expect';
import reducer from '../../src/app/reducers/membershipReducer';
import types from '../../src/app/actions/actionTypes';
import mockItems from '../__mocks__/mockItems';
import { loadMembershipTypesSuccess, updateMembershipTypeSuccess }
  from '../../src/app/actions/membershipActions';

let initialState = [];
let newState;

describe('Membership Type reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('should handle LOAD_MEMBERSHIP_TYPE_SUCCESS', () => {
    newState = reducer(initialState, loadMembershipTypesSuccess(mockItems.memberships));
    expect(newState).toEqual(mockItems.memberships);
  });

  it('should handle UPDATE_MEMBERSHIP_TYPE_SUCCESS', () => {
    initialState = [{
      id: 1,
      name: 'GOLD',
      lendDuration: 10 }];
    newState = reducer(initialState, updateMembershipTypeSuccess(mockItems.membership));
    expect(newState).toEqual([mockItems.membership]);
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedMembershipPage, { MembershipPage } from '../../../../src/app/components/admin/membership/MembershipPage';
import mockAuthCheck from '../../../__mocks__/mockAuthCheck';
import mockData from '../../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData);

jest.mock('react-router-dom');

const props = {
  memberships: mockData.memberships,
  membership: {
    id: '',
    level: '',
    lendDuration: 1,
    maxBorrowable: 1
  },
  location: {
    pathname: '/admin/memberships',
    search: ''
  },
  loadMemberships: jest.fn(() => Promise.resolve()),
  saveMembershipType: jest.fn(() => Promise.resolve()),
};

describe('Admin MembershipPage', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<MembershipPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('MembershipList')).toHaveLength(1);
    expect(wrapper.find('MembershipModal')).toHaveLength(1);
  });

  it('should render the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedMembershipPage { ...props } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('MembershipPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('MembershipList')).toHaveLength(1);
  });

  it('should call updateFormState when input changes', () => {
    const wrapper = shallow(<MembershipPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'updateFormState');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'lendDuration', value: 5 }
    };
    wrapper.instance().updateFormState(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.membership.lendDuration).toBe(event.target.value);
  });

  it('should call onEdit method', () => {
    const membership = mockData.memberships[0];
    const wrapper = shallow(<MembershipPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'onEdit');
    wrapper.instance().onEdit(membership);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.membership).toEqual(membership);
  });

  it('should call updateMembershipType method', () => {
    const wrapper = shallow(<MembershipPage { ...props } store={store} />);
    const spy = jest.spyOn(wrapper.instance(), 'updateMembershipType');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().updateMembershipType(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call updateMembership function on form submit', () => {
    const wrapper = shallow(<ConnectedMembershipPage { ...props } store={store} />);
    mockAuthCheck();
    const spy = jest.spyOn(wrapper.instance().props, 'saveMembershipType');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.dive().instance().updateMembershipType(event);
    expect(spy).toHaveBeenCalled();
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedIsAdmin, { IsAdmin } from '../../../src/app/components/common/IsAdmin';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';
import mockData from '../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData);

jest.mock('react-router-dom');

const props = {
  user: mockData.user,
  location: {
    pathname: '/admin/admin',
  },
  history: {
    replace: jest.fn()
  }
};

const Switch = jest.fn();

describe('IsAdmin Middleware', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<IsAdmin { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Switch')).toHaveLength(1);
    expect(wrapper.find('Route')).toHaveLength(8);
  });

  it('should render shallow component with page components when user is an admin', () => {
    const wrapper = shallow(<IsAdmin { ...props } />);
    expect(wrapper.find('Switch')).toHaveLength(1);
  });

  it('should return null when user is not an admin', () => {
    const newProps = { ...props };
    newProps.user.admin = false;
    const wrapper = shallow(<IsAdmin { ...newProps } />);
    const spy = jest.spyOn(wrapper.instance(), 'redirectUnauthorisedUser');
    wrapper.instance().componentWillMount();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.find('Switch')).toHaveLength(0);
  });

  it('should return null when user is not an admin', () => {
    const wrapper = shallow(<IsAdmin { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const newProps = { ...props };
    newProps.user.admin = false;
    wrapper.setProps({ ...newProps });
    expect(spy).toHaveBeenCalled();
  });

  it('should render the connected component', () => {
    const connectedAdmin = shallow(<ConnectedIsAdmin { ...props} store={store} />);
    expect(connectedAdmin).toBeDefined();
  });
});

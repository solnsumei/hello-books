import React from 'react';
import { shallow } from 'enzyme';
import AuthLinks from '../../../src/app/components/common/AuthLinks';

jest.mock('react-router-dom');

const props = {
  isAdmin: true
};

describe('AuthLinks', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<AuthLinks { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render the admin NavLinks if isAdmin is true', () => {
    const wrapper = shallow(<AuthLinks { ...props } />);
    expect(wrapper.find('NavLink')).toHaveLength(4);
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('NavLink').at(0).props().to).toBe('/admin/notifications');
    expect(wrapper.find('Link').at(0).props().to).toBe('/admin');
    expect(wrapper.find('Link').at(0).props().children).toBe('Dashboard');
  });

  it('should render ordinary users NavLinks if isAdmin is false', () => {
    const newProps = { ...props };
    newProps.isAdmin = false;
    const wrapper = shallow(<AuthLinks { ...newProps } />);
    expect(wrapper.find('NavLink')).toHaveLength(2);
    expect(wrapper.find('NavLink').at(0).props().to).toBe('/profile');
    expect(wrapper.find('NavLink').at(0).props().children).toBe('My Profile');
  });
});

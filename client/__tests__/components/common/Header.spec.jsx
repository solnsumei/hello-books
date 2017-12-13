import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../src/app/components/common/Header';

jest.mock('react-router-dom');

const props = {
  user: {},
  logout: jest.fn(),
  title: 'Home'
};

describe('Header', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<Header { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('header');
    expect(wrapper.find('header')).toHaveLength(1);
  });

  it('should render Navlink to register is title is Home or Login', () => {
    const newProps = { ...props };
    newProps.title = 'Login';
    const wrapper = shallow(<Header { ...newProps } />);
    expect(wrapper.find('NavLink').at(0).props().to).toBe('/register');
    expect(wrapper.find('NavLink').at(0).props().children).toBe('Join');
    expect(wrapper.find('NavLink').at(0).props().activeClassName).toBe('active-top');
    expect(wrapper.find('#logout')).toHaveLength(0);
  });

  it('should render Logout and populate user details', () => {
    const newProps = { ...props };
    newProps.user = {
      id: 1,
      admin: false,
      username: 'chuks',
      email: 'solejiro@gmail.com',
      firstName: 'Uche',
      surname: 'Ehiro'
    };
    newProps.title = 'Profile';
    const wrapper = shallow(<Header { ...newProps } />);
    expect(wrapper.find('.logout')).toHaveLength(2);
    expect(wrapper.find('Link').at(2).props().to).toBe('/profile');
    expect(wrapper.find('span.name').props().children).toBe('Uche Ehiro');
  });
});

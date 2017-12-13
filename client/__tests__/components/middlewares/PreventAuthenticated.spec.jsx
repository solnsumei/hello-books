import React from 'react';
import { shallow } from 'enzyme';
import PreventAuthenticated from '../../../src/app/components/middlewares/PreventAuthenticated';
import { LoginPage } from '../../../src/app/components/auth/LoginPage';

jest.mock('react-router-dom');

const props = {
  user: {},
  loginUser: jest.fn()
};

describe('PreventAuthenticated Middleware', () => {
  it('should render page when user is not logged in', () => {
    const wrapper = shallow(PreventAuthenticated(LoginPage, props));
    expect(wrapper).toBeDefined();
    expect(wrapper.find('LoginForm')).toHaveLength(1);
  });

  it('should return redirect to profile when user is logged in', () => {
    const newProps = { ...props };
    newProps.user = {
      id: 1
    };
    const wrapper = shallow(PreventAuthenticated(LoginPage, newProps));
    expect(wrapper.find('LoginForm')).toHaveLength(0);
    expect(wrapper.instance().props.to).toEqual('/profile');
  });
});

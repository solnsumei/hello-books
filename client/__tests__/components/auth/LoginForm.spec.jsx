import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../../src/app/components/auth/LoginForm';

jest.mock('react-router-dom');

const props = {
  loginParams: {
    username: '',
    password: ''
  },
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  errors: {},
  responseGoogle: jest.fn()
};

describe('Login Form', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<LoginForm { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextInput')).toHaveLength(2);
    expect(wrapper.find('Link')).toHaveLength(2);
  });

  it('should show errors when errors is not empty', () => {
    const newProps = { ...props, errors: { username: ['username error'], password: ['password error'] } };
    const wrapper = shallow(<LoginForm { ...newProps } />);
    expect(wrapper.find('TextInput').at(0).props().error).toBe(newProps.errors.username[0]);
    expect(wrapper.find('TextInput').at(1).props().error).toBe(newProps.errors.password[0]);
  });

  it('should display errors on a p tag when errors.error is not empty', () => {
    const newProps = { ...props, errors: { error: 'this error' } };
    const wrapper = shallow(<LoginForm { ...newProps } />);
    expect(wrapper.find('p.red-text')).toHaveLength(1);
    expect(wrapper.find('p.red-text').props().children).toContain(newProps.errors.error);
  });
});

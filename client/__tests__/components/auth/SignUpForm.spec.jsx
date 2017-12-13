import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../../src/app/components/auth/SignUpForm';

jest.mock('react-router-dom');

const props = {
  formParams: {
    firstName: '',
    surname: '',
    email: '',
    username: '',
    password: ''
  },
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  errors: {},
  responseGoogle: jest.fn()
};

describe('Sign Up Form', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<SignUpForm { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextInput')).toHaveLength(5);
    expect(wrapper.find('Link')).toHaveLength(1);
  });

  it('should show errors when errors is not empty', () => {
    const newProps = { ...props,
      errors: { username: ['username error'],
        password: ['password error'],
        email: ['email error'],
        firstName: ['firstName error'],
        surname: ['surname error']
      } };
    const wrapper = shallow(<SignUpForm { ...newProps } />);
    expect(wrapper.find('TextInput').at(0).props().error).toBe(newProps.errors.username[0]);
    expect(wrapper.find('TextInput').at(1).props().error).toBe(newProps.errors.email[0]);
    expect(wrapper.find('TextInput').at(2).props().error).toBe(newProps.errors.password[0]);
    expect(wrapper.find('TextInput').at(3).props().error).toBe(newProps.errors.firstName[0]);
    expect(wrapper.find('TextInput').at(4).props().error).toBe(newProps.errors.surname[0]);
  });

  it('should display errors on a p tag when errors.error is not empty', () => {
    const newProps = { ...props, errors: { error: 'this error' } };
    const wrapper = shallow(<SignUpForm { ...newProps } />);
    expect(wrapper.find('p.red-text')).toHaveLength(1);
    expect(wrapper.find('p.red-text').props().children).toBe('** There are some errors with your input');
  });
});

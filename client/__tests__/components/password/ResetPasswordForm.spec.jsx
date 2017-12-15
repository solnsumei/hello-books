import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordForm from '../../../src/app/components/password/ResetPasswordForm';

jest.mock('react-router-dom');

const props = {
  resetParams: {
    password: '',
    password_confirmation: ''
  },
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  errors: {},
};

describe('Login Form', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<ResetPasswordForm { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextInput')).toHaveLength(2);
  });

  it('should show errors when errors is not empty', () => {
    const newProps = { ...props, errors: { password: ['password error'], password_confirmation: ['password error'] } };
    const wrapper = shallow(<ResetPasswordForm { ...newProps } />);
    expect(wrapper.find('TextInput').at(0).props().error).toBe(newProps.errors.password[0]);
  });

  it('should display errors on a p tag when errors.error is not empty', () => {
    const newProps = { ...props, errors: { error: 'this error' } };
    const wrapper = shallow(<ResetPasswordForm { ...newProps } />);
    expect(wrapper.find('p.red-text')).toHaveLength(1);
    expect(wrapper.find('p.red-text').props().children).toContain(newProps.errors.error);
  });
});

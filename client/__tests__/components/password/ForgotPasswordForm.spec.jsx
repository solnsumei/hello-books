import React from 'react';
import { shallow } from 'enzyme';
import ForgotPasswordForm from '../../../src/app/components/password/ForgotPasswordForm';

jest.mock('react-router-dom');

const props = {
  resetParams: {
    entry: '',
  },
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  errors: {},
};

describe('Login Form', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<ForgotPasswordForm { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextInput')).toHaveLength(1);
  });

  it('should show errors when errors is not empty', () => {
    const newProps = { ...props, errors: { entry: ['username error'] } };
    const wrapper = shallow(<ForgotPasswordForm { ...newProps } />);
    expect(wrapper.find('TextInput').props().error).toBe(newProps.errors.entry[0]);
  });

  it('should display errors on a p tag when errors.error is not empty', () => {
    const newProps = { ...props, errors: { error: 'this error' } };
    const wrapper = shallow(<ForgotPasswordForm { ...newProps } />);
    expect(wrapper.find('p.red-text')).toHaveLength(1);
    expect(wrapper.find('p.red-text').props().children).toContain(newProps.errors.error);
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedForgotPasswordPage, { ForgotPasswordPage } from '../../../src/app/components/password/ForgotPasswordPage';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';
import mockData from '../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const user = {};
const store = mockStore(user);

jest.mock('react-router-dom');

const props = {
  resetPassword: jest.fn(() => Promise.resolve()),
};

describe('Forgot Password Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ForgotPasswordPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('ForgotPasswordForm')).toHaveLength(1);
  });

  it('should render the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedForgotPasswordPage { ...props } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('ForgotPasswordPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('ForgotPasswordForm')).toHaveLength(1);
  });

  it('should call updateFormState when input changes', () => {
    const wrapper = shallow(<ForgotPasswordPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'updateFormState');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'entry', value: 'solking' }
    };
    wrapper.instance().updateFormState(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.resetParams.entry).toBe('solking');
  });

  it('should call the onSubmit method when form is submitted', () => {
    const wrapper = shallow(<ForgotPasswordPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'onSubmit');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().onSubmit(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.errors).toEqual({});
  });

  it('should expect resetPassword has been called on the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedForgotPasswordPage { ...props } store={store} />);
    const spy = jest.spyOn(props, 'resetPassword');
    const event = {
      preventDefault: jest.fn()
    };
    connectedComponent.dive().instance().onSubmit(event);
    expect(spy).toHaveBeenCalled();
  });
});

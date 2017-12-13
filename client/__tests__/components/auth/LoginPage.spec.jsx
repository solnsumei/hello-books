import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedLoginPage, { LoginPage } from '../../../src/app/components/auth/LoginPage';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';
import mockData from '../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const user = {};
const store = mockStore(user);

jest.mock('react-router-dom');

const props = {
  loginUser: jest.fn(() => Promise.resolve()),
  loginUserFailed: jest.fn(() => Promise.reject())
};

describe('Login Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LoginPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('LoginForm')).toHaveLength(1);
  });

  it('should render the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedLoginPage { ...props } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('LoginPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('LoginForm')).toHaveLength(1);
  });

  it('should call updateFormState when input changes', () => {
    const wrapper = shallow(<LoginPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'updateFormState');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'username', value: 'solking' }
    };
    wrapper.instance().updateFormState(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.loginParams.username).toBe('solking');
  });

  it('should call the onSubmit method when form is submitted', () => {
    const wrapper = shallow(<LoginPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'onSubmit');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().onSubmit(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.errors).toEqual({});
  });

  it('should call responseGoogle when google login has errors', () => {
    const wrapper = shallow(<LoginPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'responseGoogle');
    const response = {
      error: 'error'
    };
    wrapper.instance().responseGoogle(response);
    expect(spy).toHaveBeenCalled();
  });

  it('should call login request when google login has no errors', () => {
    const wrapper = shallow(<LoginPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'loginRequest');
    const googleUserFormatter = jest.fn();
    const response = {
      profileObj: { email: 'sol@gmail.com' }
    };
    wrapper.instance().responseGoogle(response);
    expect(spy).toHaveBeenCalled();
  });

  it('should expect loginUser has been called on the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedLoginPage { ...props } store={store} />);
    const spy = jest.spyOn(props, 'loginUser');
    const event = {
      preventDefault: jest.fn()
    };
    connectedComponent.dive().instance().onSubmit(event);
    expect(spy).toHaveBeenCalled();
  });
});

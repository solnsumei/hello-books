import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedSignUpPage, { SignUpPage } from '../../../src/app/components/auth/SignUpPage';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';
import mockData from '../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const user = {};
const store = mockStore(user);

jest.mock('react-router-dom');

const props = {
  formParams: {
    firstName: '',
    surname: '',
    email: '',
    username: '',
    password: ''
  },
  signUpRequest: jest.fn(() => Promise.resolve()),
  signUpRequestFailed: jest.fn(() => Promise.reject())
};

describe('Sign Up Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SignUpPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('SignUpForm')).toHaveLength(1);
  });

  it('should render the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedSignUpPage { ...props } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('SignUpPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('SignUpForm')).toHaveLength(1);
  });

  it('should call updateFormState when input changes', () => {
    const wrapper = shallow(<SignUpPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'updateFormState');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'username', value: 'solking' }
    };
    wrapper.instance().updateFormState(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.formParams.username).toBe('solking');
  });

  it('should call the onRegistrationSubmit method when form is submitted', () => {
    const wrapper = shallow(<SignUpPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'onRegistrationSubmit');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().onRegistrationSubmit(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.errors).toEqual({});
  });

  it('should call responseGoogle when google login has errors', () => {
    const wrapper = shallow(<SignUpPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'responseGoogle');
    const response = {
      error: 'error'
    };
    wrapper.instance().responseGoogle(response);
    expect(spy).toHaveBeenCalled();
  });

  it('should call signUpRequest when google login has no errors', () => {
    const wrapper = shallow(<SignUpPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'signUpRequest');
    const googleUserFormatter = jest.fn();
    const response = {
      profileObj: { email: 'sol@gmail.com' }
    };
    wrapper.instance().responseGoogle(response);
    expect(spy).toHaveBeenCalled();
  });

  it('should expect signUpRequest has been called on the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedSignUpPage { ...props } store={store} />);
    const spy = jest.spyOn(props, 'signUpRequest');
    const event = {
      preventDefault: jest.fn()
    };
    connectedComponent.dive().instance().onRegistrationSubmit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should expect signUpRequest has been called on the connected component with google error set to true', () => {
    const connectedComponent =
      shallow(<ConnectedSignUpPage { ...props } store={store} />);
    const spy = jest.spyOn(props, 'signUpRequest');
    const response = {
      profileObj: { email: 'sol@gmail.com' }
    };
    connectedComponent.dive().instance().signUpRequest(response, true);
    expect(spy).toHaveBeenCalled();
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedResetPasswordPage, { ResetPasswordPage } from '../../../src/app/components/password/ResetPasswordPage';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';
import mockData from '../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const user = {};
const store = mockStore(user);

jest.mock('react-router-dom');

const errors = {
  response: {
    data: {
      errors: { password: 'password error' }
    }
  }
};

const error = {
  response: {
    data: {
      error: 'There was an error'
    }
  }
};

const props = {
  token: 'wrhsrssgsfregehgehgeggehegfeeheh',
  queryParams: '',
  history: {
    replace: jest.fn(),
  },
  location: {
    pathname: '/admin/notifications',
    search: ''
  },
  resetPassword: jest.fn(() => Promise.resolve()),
  resetPasswordFailedForm: jest.fn(() => Promise.reject(errors)),
  resetPasswordFailed: jest.fn(() => Promise.reject(error))
};

describe('Reset Password Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ResetPasswordPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('ResetPasswordForm')).toHaveLength(1);
  });

  it('should render the connected component', () => {
    const newProps = { ...props,
      location: {
        pathname: '/admin/notifications',
        search: '?token=rttststststrstsststsst'
      }
    };
    const connectedComponent =
      shallow(<ConnectedResetPasswordPage { ...newProps } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('ResetPasswordPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('ResetPasswordForm')).toHaveLength(1);
  });

  it('should call updateFormState when input changes', () => {
    const wrapper = shallow(<ResetPasswordPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'updateFormState');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'password', value: 'solking' }
    };
    wrapper.instance().updateFormState(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.resetParams.password).toBe('solking');
  });

  it('should call the onSubmit method when form is submitted', () => {
    const wrapper = shallow(<ResetPasswordPage { ...props } />);
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
      shallow(<ConnectedResetPasswordPage { ...props } store={store} />);
    const spy = jest.spyOn(props, 'resetPassword');
    const event = {
      preventDefault: jest.fn()
    };
    connectedComponent.dive().instance().onSubmit(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should expect resetPassword to return with errors', () => {
    const newProps = { ...props };
    // newProps.resetPassword = () => Promise.reject(error);
    const connectedComponent =
      shallow(<ConnectedResetPasswordPage { ...newProps } store={store} />);
    const spy = jest.spyOn(newProps, 'resetPassword');
    const event = {
      preventDefault: jest.fn()
    };
    connectedComponent.dive().instance().onSubmit(event);
    expect(spy).toHaveBeenCalled();
  });
});

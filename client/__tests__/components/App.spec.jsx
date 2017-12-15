import React from 'react';
import { shallow, render } from 'enzyme';
import { withRouter, MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedApp, { App } from '../../src/app/components/App';
import mockData from '../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData);

jest.mock('react-router-dom');

const props = {
  user: { id: 1 },
  pathname: '/home',
  logoutUser: jest.fn(),
  history: {
    replace: jest.fn()
  }
};

const logoutSpy = jest.spyOn(props, 'logoutUser');
const event = {
  preventDefault: jest.fn()
};

describe('App', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<App { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the logout function', () => {
    const wrapper = shallow(<App { ...props } />);
    wrapper.instance().doLogout(event);
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });

  // it('should mount connected component', () => {
  //   const connectedComponent =
  //    shallow(withRouter(<ConnectedApp { ...props } store={store} />));
  //   expect(connectedComponent.length).toBe(1);
  // });
});

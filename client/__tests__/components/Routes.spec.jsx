import React from 'react';
import { shallow, mount } from 'enzyme';
import Routes from '../../src/app/components/Routes';

jest.mock('react-router-dom');
const props = {
  user: { id: 1 },
};

const logoutProps = {
  user: {},
};


const PreventAuthenticated = jest.fn();

describe('Routes', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Routes { ...props } />);
    const indexRoute = (wrapper.find('Route').getElements())[0].props.render();
    const loginRoute = (wrapper.find('Route').getElements())[1].props.render();
    const registerRoute = (wrapper.find('Route').getElements())[2].props.render();
    const forgotPasswordRoute = (wrapper.find('Route').getElements())[3].props.render();
    const resetPasswordRoute = (wrapper.find('Route').getElements())[4].props.render();
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('main');
    expect(wrapper.find('Route')).toHaveLength(6);
    expect(wrapper.find('AuthRoute')).toHaveLength(7);
    expect(wrapper.find('Switch')).toHaveLength(1);
  });

  it('should have a className of top-padding when id is not defined', () => {
    const wrapper = shallow(<Routes { ...logoutProps } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('main').hasClass('top-padding')).toBe(true);
  });
});

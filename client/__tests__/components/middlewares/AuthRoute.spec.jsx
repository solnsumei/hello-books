import React from 'react';
import { shallow, mount } from 'enzyme';
import AuthRoute from '../../../src/app/components/middlewares/AuthRoute';
import { CatalogPage } from '../../../src/app/components/book/CatalogPage';

jest.mock('react-router-dom');

const props = {
  user: { id: 2 },
  loadBooks: jest.fn()
};

const rest = {
  user: {
    id: 1,
  }
};

describe('Auth Route Middleware', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<AuthRoute path='/books' component={CatalogPage} {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Route')).toHaveLength(1);
  });

  it('should render component when user is logged in', () => {
    const wrapper = shallow(<AuthRoute path='/books' component={CatalogPage} {...props} />);
    const catalogRoute = (wrapper.find('Route').getElements())[0].props.render(props);
    expect(catalogRoute).toEqual(<CatalogPage {...props} />);
  });

  it('should return redirect to login when user is not logged in', () => {
    const newProps = { ...props };
    newProps.user = {
      user: {}
    };
    const wrapper = shallow(<AuthRoute path='/books' component={CatalogPage} {...newProps} />);
    const redirected = (wrapper.find('Route').getElements())[0].props.render(props);
    expect(redirected.props.to.pathname).toEqual('/login');
  });
});

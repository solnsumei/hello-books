import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedCatalogPage, { CatalogPage } from '../../../src/app/components/book/CatalogPage';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';
import mockData from '../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData);

jest.mock('react-router-dom');

const props = {
  books: mockData.books,
  perPage: 5,
  itemCount: 5,
  queryParams: '',
  location: {
    pathname: '/admin/notifications',
    search: ''
  },
  loadBooks: jest.fn(() => Promise.resolve()),
};

describe('CatalogPage', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<CatalogPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('BookList')).toHaveLength(1);
    expect(wrapper.find('Book')).toHaveLength(props.books.length);
    expect(wrapper.find('Pagination')).toHaveLength(0);
  });

  it('should render shallow component with pagination without a page number', () => {
    const newProps = { ...props };
    newProps.itemCount = 7;
    const wrapper = shallow(<CatalogPage { ...newProps } />);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('should not render Books or Pagination Element when books array is empty', () => {
    const newProps = { ...props };
    newProps.books = [];
    const wrapper = mount(<CatalogPage { ...newProps } />);
    expect(wrapper.find('Book')).toHaveLength(0);
    expect(wrapper.find('Pagination')).toHaveLength(0);
  });

  it('should render shallow component with pagination with page set', () => {
    const newProps = { ...props };
    newProps.queryParams = {
      page: 1
    };
    newProps.itemCount = 7;
    const wrapper = shallow(<CatalogPage { ...newProps } />);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('should call componentWillReceiveProps when props change', () => {
    const newProps = { ...props };
    newProps.queryParams = {
      page: 1
    };
    newProps.itemCount = 10;
    const wrapper = mount(<CatalogPage { ...props } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      props: { ...newProps }
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call loadBooks on componentUpdate', () => {
    const newProps = { ...props };
    newProps.queryParams = {
      page: 2
    };
    newProps.itemCount = 10;
    const wrapper = shallow(<CatalogPage { ...props } />);
    const loadBooksSpy = jest.spyOn(wrapper.instance().props, 'loadBooks');
    wrapper.setProps({ ...newProps });
    expect(loadBooksSpy).toHaveBeenCalled();
  });

  it('should render the connected component', () => {
    const connectedCatalogPage =
      shallow(<ConnectedCatalogPage { ...props } store={store} />);
    expect(connectedCatalogPage.length).toBe(1);
  });

  it('should expect loadBooks has been called on the connected component', () => {
    const connectedCatalogPage =
      mount(<ConnectedCatalogPage { ...props } store={store} />);
    const loadBooksSpy = jest.spyOn(connectedCatalogPage.instance().props, 'loadBooks');
    expect(loadBooksSpy).toHaveBeenCalled();
  });
});

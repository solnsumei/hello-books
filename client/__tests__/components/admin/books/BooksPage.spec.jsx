import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedBooksPage, { BooksPage } from '../../../../src/app/components/admin/books/BooksPage';
import mockAuthCheck from '../../../__mocks__/mockAuthCheck';
import mockData from '../../../__mocks__/mockStoreData';

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
    pathname: '/admin/books',
    search: '?page=1'
  },
  addStockQuantity: jest.fn(() => Promise.resolve()),
  loadBooks: jest.fn(() => Promise.resolve()),
  deleteBook: jest.fn(() => Promise.resolve()),
  onDelete: jest.fn()
};

describe('Admin Book Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<BooksPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('BookList')).toHaveLength(1);
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(0);
  });

  it('should render shallow component with pagination without a page number', () => {
    const newProps = { ...props, queryParams: { page: 1 }, itemCount: 8 };
    const wrapper = shallow(<BooksPage { ...newProps } />);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('should not render any book item books is empty', () => {
    const newProps = { ...props, books: [] };
    const wrapper = shallow(<BooksPage { ...newProps } />);
    expect(wrapper.find('BookList').dive().find('BookListRow')).toHaveLength(0);
    expect(wrapper.find('Pagination')).toHaveLength(0);
  });

  it('should render the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedBooksPage { ...props } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('BooksPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('BookList').length).toBe(1);
  });

  it('should call componentWillReceiveProps when page number changes', () => {
    const newProps = { ...props, queryParams: { page: 1, }, itemCount: 8 };
    const newProps2 = { ...props, queryParams: { page: 2, }, itemCount: 20 };
    const wrapper = shallow(<BooksPage { ...newProps } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...newProps2 });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps when book length changes', () => {
    const newProps = { ...props };
    const newProps2 = { ...props, books: [mockData.books[0]] };
    const wrapper = shallow(<BooksPage { ...newProps } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...newProps2 });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps when component receives next props', () => {
    const newProps = { ...props };
    const wrapper = shallow(<BooksPage { ...props } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...newProps });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call addQuantity when add quantity button is clicked', () => {
    const newProps = { ...props };
    const wrapper = shallow(<BooksPage { ...newProps } />);
    const spy = jest.spyOn(wrapper.instance(), 'addQuantity');
    wrapper.instance().addQuantity(newProps.books[0]);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().book).toEqual(newProps.books[0]);
  });

  it('should call onClickDeleteBook when delete button is clicked', () => {
    const newProps = { ...props };
    const wrapper = shallow(<BooksPage { ...newProps } />);
    const spy = jest.spyOn(wrapper.instance(), 'onClickDeleteBook');
    wrapper.instance().onClickDeleteBook(newProps.books[0]);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().book).toEqual(newProps.books[0]);
  });

  it('should call updateQuantityFormState when input quantity changes', () => {
    const wrapper = shallow(<BooksPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'updateQuantityFormState');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'quantity', value: 10 }
    };
    wrapper.instance().updateQuantityFormState(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.quantity).toBe(event.target.value);
  });

  it('should call updateQuantityFormState and set quantity state to be 1', () => {
    const wrapper = shallow(<BooksPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'updateQuantityFormState');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'quantity', value: 0 }
    };
    wrapper.instance().updateQuantityFormState(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.quantity).toBe(1);
  });

  it('should call deleteBook method', () => {
    const newProps = { ...props };
    const wrapper = shallow(<BooksPage { ...newProps } />);
    const spy = jest.spyOn(wrapper.instance(), 'deleteBook');
    wrapper.instance().deleteBook();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().book).toEqual({});
  });

  it('should call saveQuantity method', () => {
    const newProps = { ...props };
    const wrapper = shallow(<BooksPage { ...newProps } />);
    const spy = jest.spyOn(wrapper.instance(), 'saveQuantity');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().saveQuantity(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().book).toEqual({});
  });

  it('should call deleteBook action on connected component', () => {
    const newProps = { ...props };
    const connectedComponent = shallow(
      <ConnectedBooksPage { ...newProps } store={store} />);
    const spy = jest.spyOn(connectedComponent.instance().props, 'deleteBook');
    connectedComponent.dive().instance().deleteBook();
    expect(spy).toHaveBeenCalled();
    expect(connectedComponent.dive().state().book).toEqual({});
  });

  it('should call addQuantity property on connected component', () => {
    const newProps = { ...props };
    const connectedComponent = shallow(
      <ConnectedBooksPage { ...newProps } store={store} />);
    mockAuthCheck();
    const event = {
      preventDefault: jest.fn()
    };
    const spy = jest.spyOn(connectedComponent.instance().props, 'addStockQuantity');
    connectedComponent.dive().instance().saveQuantity(event);
    expect(spy).toHaveBeenCalled();
  });
});

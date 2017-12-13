import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedBorrowHistoryPage, { BorrowHistoryPage } from '../../../src/app/components/users/BorrowHistoryPage';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';
import mockData from '../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData);

jest.mock('react-router-dom');

const props = {
  user: mockData.user2,
  borrowedBooks: mockData.borrowedBooks,
  perPage: 5,
  itemCount: 5,
  queryParams: '',
  location: {
    pathname: '/admin/memberships',
    search: ''
  },
  loadBorrowedBooks: jest.fn(() => Promise.resolve()),
  loadBooksNotReturned: jest.fn(() => Promise.resolve()),
  returnBook: jest.fn(() => Promise.resolve())
};

describe('Borrow History Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<BorrowHistoryPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('BorrowedItem')).toHaveLength(props.borrowedBooks.length);
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(0);
  });

  it('should render shallow component with pagination without a page number', () => {
    const newProps = { ...props, queryParams: { page: 1 }, itemCount: 8 };
    const wrapper = shallow(<BorrowHistoryPage { ...newProps } />);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('should not render any borrowed item when borrowed book is empty', () => {
    const newProps = { ...props, borrowedBooks: [] };
    const wrapper = shallow(<BorrowHistoryPage { ...newProps } />);
    expect(wrapper.find('BorrowedItem')).toHaveLength(0);
    expect(wrapper.find('Pagination')).toHaveLength(0);
  });

  it('should render the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedBorrowHistoryPage { ...props } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('BorrowHistoryPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('BorrowedItem').length).toBe(props.borrowedBooks.length);
  });

  it('should render shallow component with pagination with page set', () => {
    const newProps = { ...props, queryParams: { page: 1 }, itemCount: 8 };
    const wrapper = shallow(<BorrowHistoryPage { ...newProps } />);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('should call loadBooksNotReturned if returned is set in querystring', () => {
    const newProps = { ...props, queryParams: { page: 1, returned: 'false' }, itemCount: 8 };
    const spy = jest.spyOn(props, 'loadBooksNotReturned');
    const wrapper = shallow(<BorrowHistoryPage { ...newProps } store={store} />);
    expect(wrapper.find('Link').at(0).props().to).toBe('borrow-history');
  });

  it('should call componentWillReceiveProps when return querystring is present', () => {
    const newProps = { ...props, queryParams: { page: 1, returned: 'false' }, itemCount: 8 };
    const wrapper = mount(<BorrowHistoryPage { ...newProps } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...props });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps when return querystring updates', () => {
    const newProps = { ...props, queryParams: { page: 1, returned: 'false' }, itemCount: 8 };
    const wrapper = mount(<BorrowHistoryPage { ...props } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...newProps });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps when page number changes', () => {
    const newProps = { ...props, queryParams: { page: 1, }, itemCount: 8 };
    const newProps2 = { ...props, queryParams: { page: 2, }, itemCount: 20 };
    const wrapper = mount(<BorrowHistoryPage { ...newProps } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...newProps2 });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call componentWillReceiveProps when page number remains same', () => {
    const newProps = { ...props, queryParams: { page: 1, }, itemCount: 8 };
    const wrapper = mount(<BorrowHistoryPage { ...newProps } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...newProps });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should assert that showReturnModal is called when return button is clicked', () => {
    const newProps = { ...props };
    const wrapper = shallow(<BorrowHistoryPage { ...newProps } />);
    const spy = jest.spyOn(wrapper.instance(), 'showReturnModal');
    wrapper.find('BorrowedItem').at(0).dive().find('button')
      .at(0)
      .simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().borrowedBook).toEqual(newProps.borrowedBooks[0]);
  });

  it('should assert that confirmReturn is called when confirm button is clicked in modal', () => {
    const newProps = { ...props };
    const wrapper = shallow(<BorrowHistoryPage { ...newProps } />);
    const spy = jest.spyOn(wrapper.instance(), 'confirmReturn');
    wrapper.instance().confirmReturn();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().borrowedBook).toEqual({
      book: {
        title: ''
      } });
  });

  it('should call return book action on connected component', () => {
    const newProps = { ...props };
    const connectedComponent = shallow(
      <ConnectedBorrowHistoryPage { ...newProps } store={store} />);
    const spy = jest.spyOn(connectedComponent.instance().props, 'returnBook');
    connectedComponent.dive().instance().confirmReturn();
    expect(spy).toHaveBeenCalled();
    expect(connectedComponent.dive().state().borrowedBook).toEqual({
      book: {
        title: ''
      }
    });
  });

  it('should call return books not returned action on connected component', () => {
    const newProps = { ...props, location: { search: 'returned=false' } };
    const connectedComponent = shallow(
      <ConnectedBorrowHistoryPage { ...newProps } store={store} />);
    const spy = jest.spyOn(connectedComponent.instance().props, 'loadBooksNotReturned');
    connectedComponent.dive().setProps({ ...newProps });
    expect(spy).toHaveBeenCalled();
  });
});

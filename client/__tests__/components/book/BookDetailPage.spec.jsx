import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedBookDetailPage, { BookDetailPage } from '../../../src/app/components/book/BookDetailPage';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';
import mockData from '../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData);

jest.mock('react-router-dom');

const props = {
  user: mockData.user2,
  book: mockData.books[0],
  bookId: 1,
  match: {
    params: { id: 1 }
  },
  isBorrowed: false,
  location: {
    pathname: '/books',
  },
  getBook: jest.fn(() => Promise.resolve()),
  performAction: jest.fn(() => Promise.resolve())
};

describe('Book Detail Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<BookDetailPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('Modal')).toHaveLength(1);
    expect(wrapper.find('label.label-success')).toHaveLength(1);
    expect(wrapper.find('label.label-success').props().children).toBe('Available');
    expect(wrapper.find('label.label-danger')).toHaveLength(0);
    expect(wrapper.find('Modal').props().text).toBe('Do you want to borrow this book?');
  });

  it('should show out of stock label when book is out of stock', () => {
    const newProps = { ...props, book: mockData.books[1] };
    newProps.book.borrowedQuantity = newProps.book.stockQuantity;
    const wrapper = shallow(<BookDetailPage { ...newProps } />);
    expect(wrapper.find('label.label-success')).toHaveLength(0);
    expect(wrapper.find('label.label-danger')).toHaveLength(1);
    expect(wrapper.find('label.label-danger').props().children).toBe('Out of Stock');
    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('should call componentWillReceiveProps when props update', () => {
    const newProps = { ...props };
    const wrapper = shallow(<BookDetailPage { ...newProps } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      isBorrowed: true
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(wrapper.instance().state.isBorrowed).toBe(true);
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('button').props().children).toBe('Return');
    expect(wrapper.find('Modal').props().text).toBe('Do you want to return this book?');
  });

  it('should call componentWillReceiveProps with no changes when props update',
    () => {
      const newProps = { ...props };
      const wrapper = shallow(<BookDetailPage { ...newProps } />);
      wrapper.setProps({
        isBorrowed: false,
      });
      expect(wrapper.instance().state.isBorrowed).toBe(false);
      expect(wrapper.find('button')).toHaveLength(1);
      expect(wrapper.find('button').props().children).toBe('Borrow');
      expect(wrapper.find('Modal').props().text).toBe('Do you want to borrow this book?');
    });

  it('should call confirm action when return book button is clicked', () => {
    const newProps = { ...props };
    newProps.isBorrowed = true;
    const wrapper = shallow(<BookDetailPage { ...newProps } />);
    const confirmActionSpy = jest.spyOn(wrapper.instance(), 'confirmAction');
    wrapper.find('Modal').dive().find('button').at(1)
      .simulate('click');
    expect(confirmActionSpy).toHaveBeenCalled();
  });

  it('should call perform action when borrow book button is clicked', () => {
    const newProps = { ...props };
    const wrapper = shallow(<BookDetailPage { ...props }/>);
    const performActionSpy = jest.spyOn(props, 'performAction');
    wrapper.find('Modal').dive().find('button')
      .at(1)
      .simulate('click');
    expect(performActionSpy).toHaveBeenCalled();
  });

  it('should display book not found when book is null', () => {
    const newProps = { ...props, book: null };
    const wrapper = shallow(<BookDetailPage { ...newProps } />);
    expect(wrapper.find('h4').props().children).toBe('Book not found');
  });

  const connectedProps = {
    match: {
      params: { id: 1 }
    },
    location: {
      pathname: '/books',
    },
  };
  it('should render the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedBookDetailPage { ...connectedProps } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('BookDetailPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('Link')).toHaveLength(1);
  });

  it('should render the connected component when bookId params does not match any bookId',
    () => {
      const newProps = { ...connectedProps,
        match: {
          params: { id: 20 }
        } };
      newProps.match.params.id = 20;
      const connectedComponent =
      shallow(<ConnectedBookDetailPage { ...newProps} store={store} />);
      expect(connectedComponent.dive().find('Modal')).toHaveLength(0);
      expect(connectedComponent.dive().find('h4').props().children).toBe('Book not found');
    });

  it('should expect getBooks has been called on the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedBookDetailPage { ...connectedProps } store={store} />);
    const spy = jest.spyOn(props, 'getBook');
    expect(spy).toHaveBeenCalled();
  });

  it('should expect performAction has been called on the connected component', () => {
    const newProps = { ...props };
    newProps.book.borrowedQuantity = 0;
    newProps.match.params.id = 1;
    const connectedComponent =
      shallow(<ConnectedBookDetailPage { ...newProps } store={store} />);
    const spy = jest.spyOn(props, 'performAction');
    connectedComponent.dive().instance().confirmAction('RETURN_BOOK');
    expect(spy).toHaveBeenCalled();
  });
});

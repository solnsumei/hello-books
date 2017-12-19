import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedManageBookPage, { ManageBookPage } from '../../../../src/app/components/admin/books/ManageBookPage';
import mockAuthCheck from '../../../__mocks__/mockAuthCheck';
import mockData from '../../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData);

jest.mock('react-router-dom');

const props = {
  book: {
    id: '',
    title: '',
    author: '',
    stockQuantity: '',
    coverPic: '',
    coverPicId: '',
    description: '',
    categoryId: ''
  },
  categories: mockData.categories.map(category => (
    {
      value: category.id,
      text: category.name
    })),
  bookId: '',
  location: {
    pathname: '/admin/books',
  },
  history: {
    replace: jest.fn()
  },
  match: { params: { id: '' } },
  saveBook: jest.fn(() => Promise.resolve()),
  loadCategories: jest.fn(() => Promise.resolve()),
  getBook: jest.fn(() => Promise.resolve()),
};

describe('Admin Manage Book Page', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ManageBookPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('BookForm')).toHaveLength(1);
    expect(wrapper.find('BookForm').dive().find('TextInput')).toHaveLength(4);
    expect(wrapper.find('BookForm').dive().find('SelectInput')).toHaveLength(1);
  });

  it('should render the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedManageBookPage { ...props } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('ManageBookPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('BookForm').length).toBe(1);
  });

  it('should render component when book Id is set', () => {
    const newProps = { ...props, book: mockData.books[0], bookId: 1 };
    const wrapper = shallow(<ManageBookPage { ...newProps } />);
    expect(wrapper.find('BookForm').dive().find('TextInput').at(0)
      .props().value).toBe(newProps.book.title);
    expect(wrapper.find('BookForm').dive().find('#stockQuantity')).toHaveLength(0);
  });

  it('should call the getBook props function on connected component when params is set',
    () => {
      const newProps = { ...props, match: { params: { id: 1 } } };
      const connectedComponent =
        shallow(<ConnectedManageBookPage { ...newProps } store={store} />);
      mockAuthCheck();
      const spy = jest.spyOn(connectedComponent.instance().props, 'getBook');
      connectedComponent.dive().instance().componentDidMount();
      expect(connectedComponent.length).toBe(1);
      expect(spy).toHaveBeenCalled();
    });

  it('should call componentWillReceiveProps with no changes to state when props update',
    () => {
      const wrapper = shallow(<ManageBookPage { ...props } />);
      const componentWillReceivePropsSpy =
    jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.setProps({ ...props });
      expect(componentWillReceivePropsSpy).toHaveBeenCalled();
      expect(wrapper.instance().state.book).toEqual(props.book);
    });

  it('should call componentWillReceiveProps when bookId changes and set the state', () => {
    const newProps = { ...props, book: mockData.books[0], bookId: 1 };
    const wrapper = shallow(<ManageBookPage { ...props } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({ ...newProps });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    expect(wrapper.instance().state.book).toEqual(newProps.book);
  });

  it('should call updateFormState when input changes', () => {
    const wrapper = shallow(<ManageBookPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'updateFormState');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'title', value: 'Hello Android' }
    };
    wrapper.instance().updateFormState(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.book.title).toBe(event.target.value);
  });

  it('should call saveBook method when form is submitted', () => {
    const wrapper = shallow(<ManageBookPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'saveBook');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().saveBook(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call uploadCoverPicture method', () => {
    const wrapper = shallow(<ManageBookPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'uploadCoverPicture');
    wrapper.instance().uploadCoverPicture();
    expect(spy).toHaveBeenCalled();
  });

  it('should call saveBook prop has been called on connected component', () => {
    const connectedComponent = shallow(<ConnectedManageBookPage { ...props } store={store} />);
    const spy = jest.spyOn(connectedComponent.instance().props, 'saveBook');
    const event = {
      preventDefault: jest.fn()
    };
    connectedComponent.dive().instance().saveBook(event);
    expect(spy).toHaveBeenCalled();
  });
});

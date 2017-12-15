import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedCategoriesPage, { CategoriesPage } from '../../../../src/app/components/admin/categories/CategoriesPage';
import mockAuthCheck from '../../../__mocks__/mockAuthCheck';
import mockData from '../../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData);

jest.mock('react-router-dom');

const props = {
  categories: mockData.categories,
  category: {
    id: '',
    name: '',
  },
  perPage: 5,
  itemCount: 5,
  queryParams: '',
  location: {
    pathname: '/admin/categories',
    search: ''
  },
  loadCategories: jest.fn(() => Promise.resolve()),
  saveOrUpdateCategory: jest.fn(() => Promise.resolve()),
  deleteCategory: jest.fn(() => Promise.resolve())
};

describe('Admin CategoryPage', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<CategoriesPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('CategoryList')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(0);
    expect(wrapper.find('CategoryModal')).toHaveLength(1);
  });

  it('should render the connected component', () => {
    const connectedComponent =
      shallow(<ConnectedCategoriesPage { ...props } store={store} />);
    expect(connectedComponent.length).toBe(1);
    expect(connectedComponent.find('CategoriesPage')).toHaveLength(1);
    expect(connectedComponent.dive().find('CategoryList')).toHaveLength(1);
  });

  it('should render shallow component with pagination when page is set', () => {
    const newProps = { ...props, queryParams: { page: 1 }, itemCount: 8 };
    const wrapper = shallow(<CategoriesPage { ...newProps } />);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('should call showAddModal is called when view button is clicked', () => {
    const wrapper = shallow(<CategoriesPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'showAddModal');
    wrapper.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().category).toEqual(props.category);
  });

  it('should call updateCategoryFormState when input changes', () => {
    const wrapper = shallow(<CategoriesPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'updateCategoryFormState');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'name', value: 'Android' }
    };
    wrapper.instance().updateCategoryFormState(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.category.name).toBe(event.target.value);
  });

  it('should call componentWillReceiveProps when props change', () => {
    const newProps = { ...props, queryParams: { page: 1 }, itemCount: 8 };
    const wrapper = mount(<CategoriesPage { ...props } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      props: { ...newProps }
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call loadCategories on componentUpdate', () => {
    const newProps = { ...props, queryParams: { page: 2 }, itemCount: 30 };
    const spy = jest.spyOn(props, 'loadCategories');
    const wrapper = shallow(<CategoriesPage { ...props } />);
    wrapper.setProps({ ...newProps });
    expect(spy).toHaveBeenCalled();
  });

  it('should call the saveCategory method when form is submitted', () => {
    const wrapper = shallow(<CategoriesPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'saveCategory');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.instance().saveCategory(event);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.errors).toEqual({});
  });

  it('should call saveOrUpdateCategory method with errors', () => {
    const newProps = { ...props,
      saveOrUpdateCategory: jest.fn(() => Promise.reject()) };
    const wrapper = shallow(<ConnectedCategoriesPage { ...props } store={store}/>);

    const spy = jest.spyOn(newProps, 'saveOrUpdateCategory');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.dive().instance().saveCategory(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onEdit method', () => {
    const category = {
      name: 'New Category',
      id: 1
    };
    const wrapper = shallow(<CategoriesPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'onEdit');
    wrapper.instance().onEdit(category);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.category).toEqual(category);
  });

  it('should call onDelete method', () => {
    const category = {
      name: 'New Category',
      id: 1
    };
    const wrapper = shallow(<CategoriesPage { ...props } />);
    const spy = jest.spyOn(wrapper.instance(), 'onDelete');
    wrapper.instance().onDelete(category);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.category).toEqual(category);
  });

  it('should call confirmDelete method and corresponding actions', () => {
    const category = {
      name: 'New Category',
      id: 1
    };
    const wrapper = shallow(<ConnectedCategoriesPage { ...props } store={store} />);
    const spy = jest.spyOn(wrapper.dive().instance(), 'confirmDelete');
    const deleteSpy = jest.spyOn(props, 'deleteCategory');
    wrapper.dive().instance().confirmDelete(category);
    expect(spy).toHaveBeenCalled();
    expect(deleteSpy).toHaveBeenCalled();
    expect(wrapper.instance().state.category).toEqual(props.category);
  });
});

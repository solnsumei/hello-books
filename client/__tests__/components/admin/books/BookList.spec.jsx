import React from 'react';
import { shallow, mount } from 'enzyme';
import BookList from '../../../../src/app/components/admin/books/BookList';
import mockData from '../../../__mocks__/mockStoreData';

jest.mock('react-router-dom');

const props = {
  books: mockData.books,
  onClickAddQuantity: jest.fn(),
  onDelete: jest.fn()
};

describe('BookList', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<BookList { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('BookListRow')).toHaveLength(props.books.length);
    expect(wrapper.find('.delete-button')).toHaveLength(props.books.length);
    wrapper.find(`#add-quantity-${props.books[0].id}`).simulate('click');
    wrapper.find(`#delete-book-${props.books[0].id}`).simulate('click');
  });

  it('should not show the delete button if book has been ddleted', () => {
    props.books[0].isDeleted = 1;
    const wrapper = mount(<BookList { ...props } />);
    expect(wrapper.find('.delete-button')).toHaveLength(props.books.length - 1);
  });

  it('should render empty row when books array is empty', () => {
    props.books = [];
    const wrapper = mount(<BookList { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('BookListRow')).toHaveLength(0);
  });
});

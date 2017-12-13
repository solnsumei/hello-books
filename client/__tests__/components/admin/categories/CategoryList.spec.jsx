import React from 'react';
import { shallow, mount } from 'enzyme';
import CategoryList from '../../../../src/app/components/admin/categories/CategoryList';
import mockData from '../../../__mocks__/mockStoreData';

jest.mock('react-router-dom');

const props = {
  categories: mockData.categories,
  onEdit: jest.fn(),
  onDelete: jest.fn()
};

describe('CategoryList', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<CategoryList { ...props } />);
    expect(wrapper).toBeDefined();
    wrapper.find(`#edit-cat-${props.categories[0].id}`).simulate('click');
    wrapper.find(`#delete-cat-${props.categories[0].id}`).simulate('click');
    expect(wrapper.find('CategoryListRow')).toHaveLength(props.categories.length);
  });

  it('should render empty row when categories array is empty', () => {
    props.categories = [];
    const wrapper = mount(<CategoryList { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('CategoryListRow')).toHaveLength(0);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import AddQuantityModal from '../../../../src/app/components/admin/books/AddQuantityModal';

jest.mock('react-router-dom');

const props = {
  quantity: 1,
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  error: '',
};

describe('Add Quantity Modal', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<AddQuantityModal { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextInput')).toHaveLength(1);
  });

  it('should show errors when errors property is available', () => {
    const newProps = { ...props, error: 'Invalid quantity' };
    const wrapper = shallow(<AddQuantityModal { ...newProps } />);
    expect(wrapper.find('TextInput').props().error).toBe(newProps.error);
  });
});

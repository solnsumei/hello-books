import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from '../../../src/app/components/common/SelectInput';

jest.mock('react-router-dom');

const props = {
  name: 'name',
  label: 'label',
  onChange: jest.fn(),
  value: '',
  error: null,
  defaultOption: '1',
  active: false,
  options: [{ value: 1, text: 'option1' }, { value: 2, text: 'option2' }],
};

describe('Select Input', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<SelectInput { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find('select')).toHaveLength(1);
  });

  it('should display error if error is present', () => {
    const newProps = { ...props };
    newProps.error = 'error';
    const wrapper = shallow(<SelectInput { ...newProps } />);
    expect(wrapper.find('label.red-text')).toHaveLength(1);
    expect(wrapper.find('label.red-text').props().children).toBe(newProps.error);
  });

  it('should show active in label when active is set to true', () => {
    const newProps = { ...props };
    newProps.active = true;
    newProps.error = null;
    const wrapper = shallow(<SelectInput { ...newProps } />);
    expect(wrapper.find('label').at(0).props().className).toBe('active');
  });

  it('should display option value if option text is not defined', () => {
    const newProps = { ...props };
    newProps.options = [{ value: 1 }, { value: 2 }];
    const wrapper = shallow(<SelectInput { ...newProps } />);
    expect(wrapper.find('option').at(1).props().children).toBe(1);
  });
});

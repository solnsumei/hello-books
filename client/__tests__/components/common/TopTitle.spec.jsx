import React from 'react';
import { shallow } from 'enzyme';
import TopTitle from '../../../src/app/components/common/TopTitle';

jest.mock('react-router-dom');

const props = {
  icon: '',
  title: 'Borrowed Book'
};

describe('Top Title', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<TopTitle { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find('i')).toHaveLength(0);
  });

  it('should rdisplay icon when icon is defined', () => {
    const newProps = { ...props };
    newProps.icon = 'book';
    const wrapper = shallow(<TopTitle { ...newProps } />);
    expect(wrapper.find('i')).toHaveLength(1);
    expect(wrapper.find('i').props().children).toBe(newProps.icon);
  });
});

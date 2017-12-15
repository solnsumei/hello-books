import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../src/app/components/common/Pagination';

jest.mock('react-router-dom');

const props = {
  pageNumber: -2,
  itemCount: 10,
  perPage: 4,
  pageUrl: '/new'
};

describe('Pagination', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<Pagination { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('Link')).toHaveLength(2);
    expect(wrapper.find('Link').at(0).props().disabled).toBe('disabled');
  });

  it('should disable the next link if it is the last page', () => {
    const newProps = { ...props };
    newProps.pageNumber = 3;
    const wrapper = shallow(<Pagination { ...newProps } />);
    expect(wrapper.find('Link').at(1).props().disabled).toBe('disabled');
  });
});

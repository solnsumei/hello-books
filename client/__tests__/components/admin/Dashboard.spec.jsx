import React from 'react';
import { shallow, mount } from 'enzyme';
import Dashboard from '../../../src/app/components/admin/Dashboard';

jest.mock('react-router-dom');
const props = {
  user: { id: 1 },
};

describe('Dashboard', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Dashboard { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('Link')).toHaveLength(3);
  });
});

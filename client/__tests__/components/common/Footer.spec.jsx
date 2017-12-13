import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../src/app/components/common/Footer';

jest.mock('react-router-dom');


describe('Footer', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('footer');
    expect(wrapper.find('footer')).toHaveLength(1);
  });
});

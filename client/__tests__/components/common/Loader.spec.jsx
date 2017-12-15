import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../../src/app/components/common/Loader';

jest.mock('react-router-dom');


describe('Loader', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div.preloader-wrapper')).toHaveLength(1);
    expect(wrapper.find('div.spinner-layer')).toHaveLength(1);
    expect(wrapper.find('div.circle-clipper')).toHaveLength(2);
    expect(wrapper.find('div.gap-patch')).toHaveLength(1);
  });
});

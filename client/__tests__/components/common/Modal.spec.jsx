import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../src/app/components/common/Modal';

jest.mock('react-router-dom');

const props = {
  id: 'myModal',
  title: 'This Modal',
  text: 'Here is the text',
  action: jest.fn()
};


describe('Modal', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<Modal { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('div.modal').props().id).toBe(props.id);
    expect(wrapper.find('h4').props().children).toBe(props.title);
    expect(wrapper.find('p').props().children).toBe(props.text);
    expect(wrapper.find('button')).toHaveLength(2);
  });
});

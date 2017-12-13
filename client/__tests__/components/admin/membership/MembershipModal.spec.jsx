import React from 'react';
import { shallow } from 'enzyme';
import mockData from '../../../__mocks__/mockStoreData';
import MembershipModal from '../../../../src/app/components/admin/membership/MembershipModal';

jest.mock('react-router-dom');

const props = {
  membership: mockData.memberships[0],
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  errors: {},
};

describe('Membership Modal', () => {
  it('should render component without breaking', () => {
    const wrapper = shallow(<MembershipModal { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('TextInput')).toHaveLength(2);
  });

  it('should show errors when errors is not empty', () => {
    const newProps = { ...props, errors: { lendDuration: ['Lend duration error'], maxBorrowable: ['Max borrowable error'] } };
    const wrapper = shallow(<MembershipModal { ...newProps } />);
    expect(wrapper.find('TextInput').at(0).props().error).toBe(newProps.errors.lendDuration[0]);
    expect(wrapper.find('TextInput').at(1).props().error).toBe(newProps.errors.maxBorrowable[0]);
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import MembershipList from '../../../../src/app/components/admin/membership/MembershipList';
import mockData from '../../../__mocks__/mockStoreData';

jest.mock('react-router-dom');

const props = {
  memberships: mockData.memberships,
  onEdit: jest.fn()
};

describe('MembershipList', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<MembershipList { ...props } />);
    expect(wrapper).toBeDefined();
    wrapper.find(`#edit-level-${props.memberships[0].id}`).simulate('click');
    expect(wrapper.find('MembershipRow')).toHaveLength(props.memberships.length);
  });

  it('should render an empty row when memberships array is empty', () => {
    props.memberships = [];
    const wrapper = mount(<MembershipList { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('MembershipRow')).toHaveLength(0);
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedNotificationPage, { NotificationPage } from '../../../../src/app/components/admin/notifications/NotificationPage';
import mockAuthCheck from '../../../__mocks__/mockAuthCheck';
import mockData from '../../../__mocks__/mockStoreData';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore(mockData);

jest.mock('react-router-dom');

const props = {
  notifications: mockData.notifications,
  perPage: 5,
  itemCount: 5,
  queryParams: '',
  location: {
    pathname: '/admin/notifications',
    search: ''
  },
  loadNotifications: jest.fn(() => Promise.resolve()),
  readNotification: jest.fn(() => Promise.resolve()),
};

const loadNotificationsSpy = jest.spyOn(props, 'loadNotifications');
const readNotificationSpy = jest.spyOn(props, 'readNotification');
const notificationActions = jest.fn(() => Promise.resolve());


const event = {
  preventDefault: jest.fn()
};

describe('NotificationPage', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<NotificationPage { ...props } />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('NotificationItem')).toHaveLength(props.notifications.length);
    expect(wrapper.find('Pagination')).toHaveLength(0);
  });

  it('should render shallow component with pagination without a page number', () => {
    const newProps = { ...props };
    newProps.itemCount = 7;
    const wrapper = shallow(<NotificationPage { ...newProps } />);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('should not render the Notification or Pagination Element when notifications is empty', () => {
    const newProps = { ...props };
    newProps.notifications = [];
    const wrapper = shallow(<NotificationPage { ...newProps } />);
    expect(wrapper.find('NotificationItem')).toHaveLength(0);
    expect(wrapper.find('Pagination')).toHaveLength(0);
  });

  it('should render shallow component with pagination with page set', () => {
    const newProps = { ...props };
    newProps.queryParams = {
      page: 1
    };
    newProps.itemCount = 7;
    const wrapper = shallow(<NotificationPage { ...newProps } />);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });

  it('should assert that showNotificationModal is called when view button is clicked', () => {
    const newProps = { ...props };
    const wrapper = mount(<NotificationPage { ...newProps } />);
    const showNotificationModalSpy = jest.spyOn(wrapper.instance(), 'showNotificationModal');
    wrapper.find(`#read-${newProps.notifications[0].id}`).simulate('click');
    expect(showNotificationModalSpy).toHaveBeenCalled();
    expect(readNotificationSpy).toHaveBeenCalled();
    expect(wrapper.state().notification).toEqual(newProps.notifications[0]);
    expect(wrapper.find('NotificationModal')).toHaveLength(1);
  });

  it('should assert that NotificationModal modal to have a title of Book was returned', () => {
    const newProps = { ...props };
    const wrapper = mount(<NotificationPage { ...newProps } />);
    wrapper.find(`#read-${newProps.notifications[1].id}`).simulate('click');
    expect(wrapper.find('NotificationModal').props().title).toEqual('Book Was Returned');
  });

  it('should expect notification state to be an empty object', () => {
    const newProps = { ...props };
    const wrapper = mount(<NotificationPage { ...newProps } />);
    wrapper.find('#dismiss-modal').simulate('click');
    expect(wrapper.state().notification).toEqual({});
  });

  it('should call componentWillReceiveProps when props change', () => {
    const newProps = { ...props };
    newProps.queryParams = {
      page: 1
    };
    newProps.itemCount = 10;
    const wrapper = mount(<NotificationPage { ...props } />);
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    wrapper.setProps({
      props: { ...newProps }
    });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('should call loadNotifications on componentUpdate', () => {
    const newProps = { ...props };
    newProps.queryParams = {
      page: 2
    };
    newProps.itemCount = 10;
    const wrapper = shallow(<NotificationPage { ...props } />);
    wrapper.setProps({ ...newProps });
    expect(loadNotificationsSpy).toHaveBeenCalled();
  });

  it('should render the connected component', () => {
    const connectedNotificationPage =
      shallow(<ConnectedNotificationPage { ...props } store={store} />);
    expect(connectedNotificationPage.length).toBe(1);
  });

  it('should expect dispatch loadNotifications has been called', () => {
    const connectedNotificationPage =
      mount(<ConnectedNotificationPage { ...props } store={store} />);
    const dispatchSpy = jest.spyOn(connectedNotificationPage.instance().props, 'loadNotifications');
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should assert readNotification in mapDispatchToState has been called', () => {
    const newProps = { ...props };
    const wrapper = mount(<ConnectedNotificationPage { ...newProps } store={store}/>);
    const readConnectedNotificationSpy = jest.spyOn(wrapper.instance().props, 'readNotification');
    wrapper.find(`#read-${newProps.notifications[0].id}`).simulate('click');
    expect(readConnectedNotificationSpy).toHaveBeenCalled();
  });
});

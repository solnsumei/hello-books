import React from 'react';
import toastr from 'toastr';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NotificationItem from './NotificationItem';
import TopTitle from '../../common/TopTitle';
import NotificationModal from './NotificationModal';
import actionTypes from '../../../actions/actionTypes';
import notificationActions from '../../../actions/notificationActions';

/**
 *
 */
class NotificationPage extends React.Component {
  /**
  * [constructor description]
  * @method constructor
  * @param  {Object} props
  * @return {void} 
 */
  constructor(props) {
    super(props);

    this.state = {
      notification: {}
    };

    this.dismissModal = this.dismissModal.bind(this);
    this.showNotificationModal = this.showNotificationModal.bind(this);
  }

  /**
   * Load notifications
   * @memberof NotificationPage
   * @returns {void}
   */
  componentDidMount() {
    this.props.loadNotifications();
    $('.modal').modal();
  }

  /**
   * Method to show modal show notification item
   * @method showModal
   * @param  {Object} notification [description]
   * @return {void}
   */
  showNotificationModal(notification) {
    this.setState({ notification });
    this.props.readNotification(notification.id);
    $('.modal').modal('open');
  }

  /**
   * Dismiss modal
   * @memberof NotificationPage
   * @return {void}
   */
  dismissModal() {
    this.setState({ notification: {} });
    $('.modal').modal('close');
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <table className="responsive-table striped">
                  <thead>
                    <tr>
                      <th>Notification</th>
                      <th>By</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    { this.props.notifications.length > 0 ?
                      this.props.notifications.map(notification =>
                        <NotificationItem key={notification.id}
                          action={selectedNotification =>
                            this.showNotificationModal(notification)}
                          notification={notification}
                        />
                      ) :
                      <tr>
                        <td colSpan="4" className="center-align">
                          You have no unread notification yet.
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <NotificationModal id="modal1"
          title={this.state.notification.returned ? 'Book Was Returned' : 'Book Was Borrowed'}
          notification={this.state.notification}
          action={this.dismissModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const notifications = state.notifications.sort((a, b) => (b.id - a.id));

  return ({
    notifications,
  });
};

const mapDispatchToProps = dispatch => ({
  readNotification: notificationId =>
    dispatch(notificationActions(actionTypes.READ_NOTIFICATION, notificationId)),
  loadNotifications: () =>
    dispatch(notificationActions(actionTypes.LOAD_UNREAD_NOTIFICATIONS))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);

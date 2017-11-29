import React from 'react';
import toastr from 'toastr';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from '../../common/Pagination';
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
    if (parseInt(this.props.queryParams.page, 10)) {
      this.props.loadNotifications(this.props.queryParams.page, this.props.perPage);
    } else {
      this.props.loadNotifications(null, this.props.perPage);
    }
    $('.modal').modal();
  }

  /**
     * 
     * @param {any} nextProps 
     * @memberof NotificationPage
     * @returns {void}
     */
  componentWillReceiveProps(nextProps) {
    if ((this.props.queryParams.page !== nextProps.queryParams.page) ||
     (this.props.notifications !== nextProps.notifications)) {
      this.props.loadNotifications(nextProps.queryParams.page, nextProps.perPage);
    }
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
        {(this.props.itemCount > this.props.perPage) &&
          <Pagination
            itemCount={this.props.itemCount}
            perPage={this.props.perPage}
            pageNumber={this.props.queryParams.page}
            pageUrl={this.props.location.pathname}
          />
        }
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
  let queryParams = ownProps.location.search;

  if (queryParams) {
    queryParams = queryString.parse(queryParams);
  }

  return {
    perPage: 20,
    itemCount: state.itemCount.notifications,
    queryParams,
    notifications,
  };
};

const mapDispatchToProps = dispatch => ({
  readNotification: notificationId =>
    dispatch(notificationActions(actionTypes.READ_NOTIFICATION, notificationId)),
  loadNotifications: (page, limit) =>
    dispatch(notificationActions(actionTypes.LOAD_UNREAD_NOTIFICATIONS, page, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);

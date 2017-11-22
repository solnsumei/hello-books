import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Dashboard from '../admin/Dashboard';
import CategoriesPage from '../admin/categories/CategoriesPage';
import BooksPage from '../admin/books/BooksPage';
import ManageBookPage from '../admin/books/ManageBookPage';
import MembershipPage from '../admin/membership/MembershipPage';
import NotificationPage from '../admin/notifications/NotificationPage';
import actionTypes from '../../actions/actionTypes';
import categoryActions from '../../actions/categoryActions';
import membershipActions from '../../actions/membershipActions';
import notificationActions from '../../actions/notificationActions';
/**
*
*/
class IsAdmin extends React.Component {
  /**
   * [redirectUnauthorisedUser description]
   * @method redirectUnauthorisedUser
   * @return {[type]}                 [description]
   */
  redirectUnauthorisedUser() {
    if (!this.props.user.admin) {
      this.props.history.replace('/profile');
    }
  }

  /**
   * [componentDidMount description]
   * @method componentWillMount
   * @return {[type]}          [description]
   */
  componentWillMount() {
    this.redirectUnauthorisedUser();
    if (this.props.user.admin) {
      this.props.loadCategories();
      this.props.loadMembership();
      this.props.loadNotifications();
    }
  }

  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    if (this.props.user.admin) {
      return (
        <Switch>
          <Route exact path="/admin" component={Dashboard} />
          <Route path="/admin/notifications" component={NotificationPage} />
          <Route path="/admin/categories" component={CategoriesPage} />
          <Route path="/admin/membership-types" component={MembershipPage} />
          <Route exact path="/admin/books" component={BooksPage} />
          <Route path="/admin/books/create" component={ManageBookPage} />
          <Route path="/admin/books/:id" component={ManageBookPage} />
        </Switch>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  currentURL: ownProps.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(categoryActions(actionTypes.LOAD_CATEGORIES)),
  loadMembership: () => dispatch(membershipActions(actionTypes.LOAD_MEMBERSHIP_TYPES)),
  loadNotifications: () => dispatch(notificationActions(actionTypes.LOAD_UNREAD_NOTIFICATIONS))
});

IsAdmin.propTypes = {
  user: PropTypes.object,
  loadCategories: PropTypes.func.isRequired,
  loadMembership: PropTypes.func.isRequired,
  loadNotifications: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(IsAdmin);

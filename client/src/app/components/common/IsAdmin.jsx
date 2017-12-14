import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from '../admin/Dashboard';
import CategoriesPage from '../admin/categories/CategoriesPage';
import BooksPage from '../admin/books/BooksPage';
import ManageBookPage from '../admin/books/ManageBookPage';
import MembershipPage from '../admin/membership/MembershipPage';
import NotificationPage from '../admin/notifications/NotificationPage';
import NotFound from '../NotFound';

/**
*
*/
export class IsAdmin extends React.Component {
  /**
   * [redirectUnauthorisedUser description]
   * @method redirectUnauthorisedUser
   * @return {[type]}                 [description]
   */
  redirectUnauthorisedUser({ user }) {
    if (!user.admin) {
      this.props.history.replace('/profile');
    }
  }

  /**
   * [componentDidMount description]
   * @method componentWillMount
   * @return {[type]}          [description]
   */
  componentWillMount() {
    this.redirectUnauthorisedUser(this.props);
  }

  /**
   * 
   * @param {any} nextProps 
   * @memberof IsAdmin
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    this.redirectUnauthorisedUser(nextProps);
  }

  /**
   * Renders routes if admin is logged in
   * @method render
   * 
   * @return {Object} Switch
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
          <Route path="*" component={NotFound} />
        </Switch>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
});

IsAdmin.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(IsAdmin);

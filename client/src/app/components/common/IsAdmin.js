import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import setRedirectUrl from '../../actions/redirectActions';
import Dashboard from '../admin/Dashboard';
import CategoriesPage from '../admin/CategoriesPage';
import BooksPage from '../admin/books/BooksPage';
import ManageBookPage from '../admin/books/ManageBookPage';
import MembershipTypePage from '../admin/MembershipTypePage';
import actionTypes from '../../actions/actionTypes';
import categoryActions from '../../actions/categoryActions';

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
   * @method componentDidMount
   * @return {[type]}          [description]
   */
  componentDidMount() {
    this.redirectUnauthorisedUser();
    if (this.props.user.admin) {
      if (!Object.keys(this.props.categories).length > 0) {
        this.props.loadBookCategories();
      }
    }
  }

  /**
   * [componentDidUpdate description]
   * @method componentDidUpdate
   * @param  {[type]} prevProps [description]
   * @return {[type]} [description]
   */
  componentDidUpdate(prevProps) {
    this.redirectUnauthorisedUser();
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
          <Route path="/admin/categories" component={CategoriesPage} />
          <Route path="/admin/membership-types" component={MembershipTypePage} />
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
  user: ownProps.user,
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  setRedirectUrl: url => dispatch(setRedirectUrl(url)),
  loadBookCategories: () =>
    dispatch(categoryActions(actionTypes.LOAD_CATEGORIES))
});

IsAdmin.propTypes = {
  user: PropTypes.object,
  categories: PropTypes.array,
  loadBookCategories: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(IsAdmin);

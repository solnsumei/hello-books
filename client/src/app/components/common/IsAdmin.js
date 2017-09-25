import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setRedirectUrl from '../../actions/redirectActions';
import Dashboard from '../admin/Dashboard';
import CategoriesPage from '../admin/CategoriesPage';

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
        </Switch>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user
});

const mapDispatchToProps = dispatch => ({
  setRedirectUrl: url => dispatch(setRedirectUrl(url)),
});

IsAdmin.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(IsAdmin);

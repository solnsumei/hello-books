import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CatalogPage from './book/CatalogPage';
import BookDetailPage from './book/BookDetailPage';
import BorrowHistoryPage from './users/BorrowHistoryPage';
import ProfilePage from './users/ProfilePage';
import setRedirectUrl from '../actions/redirectActions';

/**
 *
 */
class AuthRoutes extends React.Component {
  /**
   * [componentDidMount description]
   * @method componentDidMount
   * @return {[type]}          [description]
   */
  componentDidMount() {
    const { dispatch, currentURL } = this.props;

    if (!this.props.user.username) {
      this.props.setRedirectUrl(currentURL);
      this.props.history.replace('/login');
    }
  }

  /**
   * [componentDidUpdate description]
   * @method componentDidUpdate
   * @param  {[type]}           prevProps [description]
   * @return {[type]}                     [description]
   */
  componentDidUpdate(prevProps) {
    const isLoggingIn = !prevProps.user.username && this.props.user.username;
    const loggedOut = prevProps.user.username && !this.props.user.username;

    if (loggedOut) {
      this.props.history.replace('/login');
    }
  }

  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    if (this.props.user && this.props.user.username) {
      return (
        <Switch>
          <Route path='/catalog' component={CatalogPage} />
          <Route path='/book-detail' component={BookDetailPage} />
          <Route path='/borrow-history' component={BorrowHistoryPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  currentURL: ownProps.location.pathname
});

const mapDispatchToProps = dispatch => ({
  setRedirectUrl: url => dispatch(setRedirectUrl(url))
});

AuthRoutes.propTypes = {
  user: PropTypes.object,
  currentURL: PropTypes.string,
  setRedirectUrl: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoutes);

import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setRedirectUrl from '../../actions/redirectActions';
import actionTypes from '../../actions/actionTypes';
import borrowActions from '../../actions/borrowActions';

export default (ComposedComponent) => {
  /**
   *
   */
  class IsAuthenticated extends React.Component {
    /**
     * [redirectToLogin description]
     * @method redirectToLogin
     * @return {[type]}        [description]
     */
    redirectToLogin() {
      if (!this.props.user.id) {
        this.props.setRedirectUrl(this.props.currentURL);
        this.props.history.replace('/login');
      }
    }

    /**
     * [componentDidMount description]
     * @method componentDidMount
     * @return {[type]}          [description]
     */
    componentDidMount() {
      this.redirectToLogin();

      if (this.props.user.username) {
        this.props.loadBorrowedBooks();
      }

      $('.modal').modal();
    }

    /**
     * [componentDidUpdate description]
     * @method componentDidUpdate
     * @param  {[type]} prevProps [description]
     * @return {[type]} [description]
     */
    componentDidUpdate(prevProps) {
      this.redirectToLogin();
    }

    /**
     * [render description]
     * @method render
     * @return {[type]} [description]
     */
    render() {
      if (this.props.user && this.props.user.username) {
        return (
          <ComposedComponent {...this.props} {...this.state} />
        );
      }
      return null;
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    currentURL: ownProps.location.pathname,
    redirectUrl: state.redirectUrl,
    borrowedBooks: state.borrowedBooks,
  });

  const mapDispatchToProps = dispatch => ({
    setRedirectUrl: url => dispatch(setRedirectUrl(url)),
    loadBorrowedBooks: user =>
      dispatch(borrowActions(actionTypes.LOAD_BORROWED_BOOKS)),
  });

  IsAuthenticated.propTypes = {
    user: PropTypes.object,
    currentURL: PropTypes.string,
    redirectUrl: PropTypes.string,
    setRedirectUrl: PropTypes.func.isRequired,
    loadBorrowedBooks: PropTypes.func,
  };

  return connect(mapStateToProps, mapDispatchToProps)(IsAuthenticated);
};

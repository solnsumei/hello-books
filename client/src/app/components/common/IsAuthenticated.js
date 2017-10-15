import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setRedirectUrl from '../../actions/redirectActions';
import membershipTypeActions from '../../actions/membershipTypeActions';
import actionTypes from '../../actions/actionTypes';
import bookActions from '../../actions/bookActions';
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
      if (!this.props.user.username) {
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

      if (this.props.user.username && this.props.membershipTypes.length <= 0) {
        this.props.loadMembershipTypes();
      }

      if (this.props.user.username && this.props.books.length <= 0) {
        this.props.loadBooks();
      }

      if (this.props.user.username && this.props.borrowedBooks.length <= 0) {
        this.props.loadBorrowedBooks(this.props.user);
      }

      $('.modal').modal();
      $('select').material_select();
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
    membershipTypes: state.membershipTypes,
    books: state.books,
    borrowedBooks: state.borrowedBooks
  });

  const mapDispatchToProps = dispatch => ({
    setRedirectUrl: url => dispatch(setRedirectUrl(url)),
    loadMembershipTypes: () =>
      dispatch(membershipTypeActions(actionTypes.LOAD_MEMBERSHIP_TYPES)),
    loadBooks: () => dispatch(bookActions(actionTypes.LOAD_BOOKS)),
    loadBorrowedBooks: user =>
      dispatch(borrowActions(actionTypes.LOAD_BORROWED_BOOKS, user))
  });

  IsAuthenticated.propTypes = {
    user: PropTypes.object,
    currentURL: PropTypes.string,
    redirectUrl: PropTypes.string,
    setRedirectUrl: PropTypes.func.isRequired,
    loadMembershipTypes: PropTypes.func,
    loadBooks: PropTypes.func,
    loadBorrowedBooks: PropTypes.func,
  };

  return connect(mapStateToProps, mapDispatchToProps)(IsAuthenticated);
};

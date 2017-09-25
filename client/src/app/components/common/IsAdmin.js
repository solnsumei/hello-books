import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setRedirectUrl from '../../actions/redirectActions';

export default (ComposedComponent) => {
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
          <ComposedComponent />
        );
      }
      return null;
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    user: state.user,
  });

  const mapDispatchToProps = dispatch => ({
    setRedirectUrl: url => dispatch(setRedirectUrl(url)),
  });

  IsAdmin.propTypes = {
    user: PropTypes.object,
  };

  return connect(mapStateToProps, mapDispatchToProps)(IsAdmin);
};

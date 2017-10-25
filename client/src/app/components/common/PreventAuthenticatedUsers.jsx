import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setRedirectUrl from '../../actions/redirectActions';

export default (ComposedComponent) => {
  /**
   *
   */
  class PreventAuthenticatedUsers extends React.Component {
    /**
     * [checkAndRedirectUser description]
     * @method checkAndRedirectUser
     * @return {[type]}             [description]
     */
    checkAndRedirectUser() {
      if (this.props.user.username) {
        if (!this.props.redirectUrl) {
          this.props.history.replace('/profile');
        } else {
          this.props.history.replace(this.props.redirectUrl);
          this.props.setRedirectUrl('');
        }
      }
    }
    /**
     * [componentDidMount description]
     * @method componentDidMount
     * @return {[type]}          [description]
     */
    componentDidMount() {
      this.checkAndRedirectUser();
    }

    /**
     * [componentDidUpdate description]
     * @method componentDidUpdate
     * @param  {[type]}           prevProps [description]
     * @return {[type]}                     [description]
     */
    componentDidUpdate(prevProps) {
      this.checkAndRedirectUser();
    }

    /**
     * [render description]
     * @method render
     * @return {[type]} [description]
     */
    render() {
      if (!this.props.user.username) {
        return (
          <ComposedComponent />
        );
      }
      return null;
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    redirectUrl: state.redirectUrl
  });

  const mapDispatchToProps = dispatch => ({
    setRedirectUrl: url => dispatch(setRedirectUrl(url))
  });

  PreventAuthenticatedUsers.propTypes = {
    user: PropTypes.object,
    redirectUrl: PropTypes.string,
    setRedirectUrl: PropTypes.func.isRequired
  };

  return connect(mapStateToProps, mapDispatchToProps)(PreventAuthenticatedUsers);
};

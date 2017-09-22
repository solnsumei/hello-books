import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setRedirectUrl from '../../actions/redirectActions';

export default (ComposedComponent) => {
  /**
   *
   */
  class IsAuthenticated extends React.Component {
    /**
     * [componentDidMount description]
     * @method componentDidMount
     * @return {[type]}          [description]
     */
    componentDidMount() {
      const { currentURL, user, history, redirectUrl } = this.props;

      if (!user.username) {
        this.props.setRedirectUrl(currentURL);
        history.replace('/login');
      }
    }

    /**
     * [componentDidUpdate description]
     * @method componentDidUpdate
     * @param  {[type]}           prevProps [description]
     * @return {[type]}                     [description]
     */
    componentDidUpdate(prevProps) {
      if (prevProps.user.username && !this.props.user.username) {
        this.props.setRedirectUrl(this.props.currentURL);
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
          <ComposedComponent />
        );
      }
      return null;
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    currentURL: ownProps.location.pathname,
    redirectUrl: state.redirectUrl
  });

  const mapDispatchToProps = dispatch => ({
    setRedirectUrl: url => dispatch(setRedirectUrl(url))
  });

  IsAuthenticated.propTypes = {
    user: PropTypes.object,
    currentURL: PropTypes.string,
    redirectUrl: PropTypes.string,
    setRedirectUrl: PropTypes.func.isRequired
  };

  return connect(mapStateToProps, mapDispatchToProps)(IsAuthenticated);
};

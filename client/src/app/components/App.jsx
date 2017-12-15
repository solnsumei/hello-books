import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Router } from 'react-router-dom';
import Routes from './Routes';
import Header from './common/Header';
import Footer from './common/Footer';
import { logoutRequest } from '../actions/userActions';
import routeTitle from '../helpers/routeTitle';

/**
 * App class, renders the default page
 * @extends React.Component
 */
export class App extends React.Component {
  /**
   * Class constructor
   * @method constructor
   * @param {Object} props
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  /**
   * Logs out user when logout is cliocked
   * @method doLogout
   * @param  {Object} event
   * 
   * @return {void}
   */
  doLogout(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.replace('/login');
  }

  /**
   * Renders output display
   * @method render
   * 
   * @return {Object} html
   */
  render() {
    const props = this.props;

    return (
      <div>
        <Header title={routeTitle(props.pathname)}
          user={props.user} logout={this.doLogout} />
        <Routes {...props} />
        {props.user.id && <Footer />}
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  pathname: PropTypes.string,
  logoutUser: PropTypes.func.isRequired
};

/**
 * @param {Object} state 
 * @param {Object} ownProps
 * 
 * @returns {Object} props
 */
const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  pathname: ownProps.location.pathname
});

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * 
 * @returns {Object} actions
 */
const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutRequest())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Router } from 'react-router-dom';
import Routes from './Routes';
import Header from './common/Header';
import Footer from './common/Footer';
import { logoutRequest } from '../actions/userActions';
import { routeTitles } from '../helpers/constants';

/**
 * [propTypes description]
 * @type {Object}
 */
export class App extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
   */
  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  /**
   * [doLogout description]
   * @method doLogout
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  doLogout(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.replace('/login');
  }

  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    const props = this.props;
    return (
      <div>
        <Header title={routeTitles(this.props.pathname)}
          user={this.props.user} logout={this.doLogout} />
        <Routes {...props} />
        {this.props.user.id && <Footer />}
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  pathname: PropTypes.string,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  pathname: ownProps.location.pathname
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutRequest())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

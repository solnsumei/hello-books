import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';
import Header from './common/Header';
import { logoutRequest } from '../actions/userActions';

const protectedRoutes = ['/catalog', '/book-detail', '/borrow-history', '/profile'];
/**
 * [propTypes description]
 * @type {Object}
 */
class App extends React.Component {
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
    return (
      <div>
        <Header title={this.props.title} user={this.props.user} logout={this.doLogout}/>
        <Routes user={this.props.user}/>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutRequest())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';
import Header from './common/Header';
import { logoutRequest } from '../actions/userActions';
import { routeTitles } from '../helpers/constants';

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
   * [componentDidUpdate description]
   * @method componentDidUpdate
   * @param  {[type]}           prevProps [description]
   * @return {[type]}                     [description]
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.user.username && this.props.user.username) {
      const user = this.props.user;
    }
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
        <Header title={routeTitles(this.props.pathname)}
          user={this.props.user} logout={this.doLogout}/>
        <Routes user={this.props.user}/>
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

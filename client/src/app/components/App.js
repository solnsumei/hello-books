import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Routes from './Routes';
import Header from './common/Header';
/**
 * [propTypes description]
 * @type {Object}
 */
class App extends React.Component {
  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    return (
      <div>
        <Header user={this.props.user}/>
        <Routes user={this.props.user}/>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(App));

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import TextInput from '../common/TextInput';
import LoginForm from './LoginForm';
import { loginRequest } from '../../actions/userActions';

/**
 *
 */
class LoginPage extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loginParams: {
        username: '',
        password: ''
      },
      errors: {},
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {object} event
   * @returns {object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const loginParams = this.state.loginParams;
    loginParams[field] = event.target.value;
    return this.setState({ loginParams });
  }

  /**
   * @param {object} event
   * @return {object} state
   */
  onSubmit(event) {
    event.preventDefault();
    this.loginUser(this.state.loginParams);
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <LoginForm
            loginParams={this.state.loginParams}
            onChange={this.updateFormState}
            onSubmit={this.onSubmit}
            errors={this.state.errors} />;
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const formParams = {
    firstName: '',
    surname: '',
    email: '',
    username: '',
    password: ''
  };

  return {
    formParams,
  };
};

const mapDispatchToProps = dispatch => ({
  loginRequest: loginData => dispatch(loginRequest(loginData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

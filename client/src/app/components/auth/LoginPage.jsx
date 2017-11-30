import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import changeCase from 'change-case';
import googleUserFormatter from '../../helpers/googleUserFormatter';
import TextInput from '../common/TextInput';
import LoginForm from './LoginForm';
import { loginRequest } from '../../actions/userActions';
import setRedirectUrl from '../../actions/redirectActions';

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
    this.responseGoogle = this.responseGoogle.bind(this);
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
   * 
   * @param {any} response 
   * @memberof LoginPage
   * @returns {void}
   */
  responseGoogle(response) {
    if (response.error) {
      return toastr.error(changeCase.sentence(response.error));
    }
    const googleUser = googleUserFormatter(response);
    this.loginRequest(googleUser, true);
  }

  /**
   * @param {object} event
   * @return {object} state
   */
  onSubmit(event) {
    event.preventDefault();
    this.loginRequest(this.state.loginParams);
  }

  /**
   * @param {Object} data
   * @param {Boolean} googleError
   * @return {void}
   */
  loginRequest(data, googleError = false) {
    this.setState({ errors: {} });
    this.props.loginUser(data)
      .catch(({ response }) => this.setState({ errors: response.data }));
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
            responseGoogle={this.responseGoogle}
            errors={this.state.errors} />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loginUser: loginData => dispatch(loginRequest(loginData)),
});

export default connect(null, mapDispatchToProps)(LoginPage);

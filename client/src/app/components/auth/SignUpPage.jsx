import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import changeCase from 'change-case';
import googleUserFormatter from '../../helpers/googleUserFormatter';
import SignUpForm from './SignUpForm';
import { userSignUpRequest } from '../../actions/userActions';

/**
 * Sign up page react component class
 * @extends React.Component
 */
export class SignUpPage extends React.Component {
  /**
   * Initailizes props
   * sets state
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      formParams: { ...this.props.formParams },
      errors: {},
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.onRegistrationSubmit = this.onRegistrationSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  /**
   * Updates the form state
   * @param {Object} event
   * 
   * @return {function} setState
   */
  updateFormState(event) {
    const field = event.target.name;
    const formParams = this.state.formParams;
    formParams[field] = event.target.value;
    return this.setState({ formParams });
  }

  /**
   * Google login response
   * @param {Object} response
   * @memberof SignUpPage
   * 
   * @returns {function} signUpRequest
   */
  responseGoogle(response) {
    if (response.error) {
      return toastr.error(changeCase.sentence(response.error));
    }
    const googleUser = googleUserFormatter(response);
    this.signUpRequest(googleUser, true);
  }

  /**
   * Set up normal user registration
   * call the signUpRequest method
   * @param {object} event
   * 
   * @returns {function} signUpRequest
   */
  onRegistrationSubmit(event) {
    event.preventDefault();
    this.signUpRequest(this.state.formParams);
  }

  /**
   * Function to sign up user
   * @param {Object} data
   * @param {Boolean} googleError
   * 
   * @return {void}
   */
  signUpRequest(data, googleError = false) {
    this.setState({ errors: {} });
    return this.props.signUpRequest(data)
      .catch(({ response }) => {
        if (googleError) {
          return toastr.error('Account already exists, please login or there was an error');
        }
        return this.setState({ errors: response.data.errors });
      });
  }

  /**
   * Renders the react component
   * 
   * @return {Object} jsx
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <SignUpForm
            formParams={this.state.formParams}
            onChange={this.updateFormState}
            onSubmit={this.onRegistrationSubmit}
            responseGoogle={this.responseGoogle}
            errors={this.state.errors} />
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  signUpRequest: PropTypes.func.isRequired,
};

/**
 * Maps redux state to class props
 * @param {Object} state 
 * @param {Object} ownProps
 * 
 * @returns {Object} props
 */
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

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * 
 * @returns {Object} actions
 */
const mapDispatchToProps = dispatch => ({
  signUpRequest: userData => dispatch(userSignUpRequest(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import changeCase from 'change-case';
import googleUserFormatter from '../../helpers/googleUserFormatter';
import SignUpForm from './SignUpForm';
import SignUpSuccess from './SignUpSuccess';
import { userSignUpRequest } from '../../actions/userActions';

/**
 *
 */
class SignUpPage extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      formParams: Object.assign({}, this.props.formParams),
      errors: {},
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.onRegistrationSubmit = this.onRegistrationSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  /**
   * @param {object} event
   * @returns {object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const formParams = this.state.formParams;
    formParams[field] = event.target.value;
    return this.setState({ formParams });
  }

  /**
   * 
   * @param {any} response 
   * @memberof SignUpPage
   * @returns {void}
   */
  responseGoogle(response) {
    if (response.error) {
      return toastr.error(changeCase.sentence(response.error));
    }
    const googleUser = googleUserFormatter(response);
    this.signUpRequest(googleUser, true);
  }

  /**
   * @param {object} event
   * @return {object} state
   */
  onRegistrationSubmit(event) {
    event.preventDefault();
    this.signUpRequest(this.state.formParams);
  }

  /**
   * @param {Object} data
   * @param {Boolean} googleError
   * @return {void}
   */
  signUpRequest(data, googleError = false) {
    this.setState({ errors: {} });
    return this.props.signUpRequest(data)
      .catch(({ response }) => {
        if (response.data.errors) {
          if (googleError) {
            if (response.data.errors.username || response.data.errors.username) {
              return toastr.error('Account already exists, please login');
            }
            return toastr.error('Your request could not be completed, please try again later');
          }
          return this.setState({ errors: response.data.errors });
        }
      });
  }

  /**
   * [render description]
   * @return {[type]} [description]
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
  signUpRequest: userData => dispatch(userSignUpRequest(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

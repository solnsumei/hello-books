import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
   * @param {object} event
   * @return {object} state
   */
  onRegistrationSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.signUpRequest(this.state.formParams)
      .catch(({ response }) => {
        if (response.data.error.errors) {
          return this.setState({ errors: response.data.error.errors });
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

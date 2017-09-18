import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { userSignUpRequest, userSignUpSuccess } from '../../actions/userActions';

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
      errors: {}
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
    const formParams = this.state.formParams;
    formParams[field] = event.target.value;
    return this.setState({ formParams });
  }

  /**
   * @param {object} event
   * @return {object} state
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.signUpRequest(this.state.formParams);
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
            onSubmit={this.onSubmit}
            errors={this.state.errors} />
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  signUpRequest: PropTypes.func.isRequired
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
  signUpRequest: userData => dispatch(userSignUpRequest(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

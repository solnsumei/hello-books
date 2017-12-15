import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import toastr from 'toastr';
import TextInput from '../common/TextInput';
import ResetPasswordForm from './ResetPasswordForm';
import { resetPassword } from '../../actions/userActions';

/**
 * Reset password page
 * handles resetting the user password
 * @extends React.Component
 */
export class ResetPasswordPage extends React.Component {
  /**
   * Initializes props and state
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      resetParams: {
        password: '',
        password_confirmation: ''
      },
      errors: {},
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Updates the form state
   * @param {Object} event
   * 
   * @returns {function} setState
   */
  updateFormState(event) {
    const field = event.target.name;
    const resetParams = Object.assign({}, this.state.resetParams);
    resetParams[field] = event.target.value;
    return this.setState({ resetParams });
  }

  /**
   * Submit form
   * @param {Object} event
   * @return {Object} response
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.resetPassword(this.state.resetParams, this.props.token)
      .then(() => this.props.history.replace('/login'))
      .catch((response) => {
        if (response.data.error) {
          return toastr.error(response.data.error);
        }
        return this.setState({ errors: response.data.errors });
      });
  }

  /**
   * Renders the component
   * 
   * @return {Object} jsx
   */
  render() {
    if (!this.props.token) {
      return <Redirect to="/forgot-password" />;
    }
    return (
      <div className="container">
        <div className="row">
          <ResetPasswordForm
            resetParams={this.state.resetParams}
            onChange={this.updateFormState}
            onSubmit={this.onSubmit}
            errors={this.state.errors} />
        </div>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  token: PropTypes.string
};

/**
 * Maps redux state to class props
 * @param {Object} state 
 * @param {Object} ownProps
 * 
 * @returns {Object} props
 */
const mapStateToProps = (state, ownProps) => {
  const queryParams = queryString.parse(ownProps.location.search);

  const token = queryParams.token;
  return {
    token
  };
};

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * 
 * @returns {Object} actions
 */
const mapDispatchToProps = dispatch => ({
  resetPassword: (resetParams, token) => dispatch(resetPassword(resetParams, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);

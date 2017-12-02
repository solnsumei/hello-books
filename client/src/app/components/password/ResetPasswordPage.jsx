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
 *
 */
class ResetPasswordPage extends React.Component {
  /**
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
   * @param {object} event
   * @returns {object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const resetParams = Object.assign({}, this.state.resetParams);
    resetParams[field] = event.target.value;
    return this.setState({ resetParams });
  }

  /**
   * @param {object} event
   * @return {object} state
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.resetPassword(this.state.resetParams, this.props.token)
      .then(({ data }) => {
        toastr.success(data.message);
        return this.props.history.replace('/login');
      })
      .catch(({ response }) => {
        if (response.data.error) {
          return toastr.error(response.data.error);
        }
        return this.setState({ errors: response.data.errors });
      });
  }

  /**
   * [render description]
   * @return {[type]} [description]
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
  token: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let queryParams = ownProps.location.search;

  if (queryParams) {
    queryParams = queryString.parse(queryParams);
  }

  const token = queryParams.token;
  return {
    token
  };
};

const mapDispatchToProps = dispatch => ({
  resetPassword: (resetParams, token) => dispatch(resetPassword(resetParams, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);

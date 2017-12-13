import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import TextInput from '../common/TextInput';
import Loader from '../common/Loader';
import ForgotPasswordForm from './ForgotPasswordForm';
import { forgotPassword } from '../../actions/userActions';

/**
 *
 */
export class ForgotPasswordPage extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      resetParams: {
        entry: '',
      },
      loading: false,
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
    const resetParams = { ...this.state.resetParams };
    resetParams[field] = event.target.value;
    return this.setState({ resetParams });
  }

  /**
   * @param {object} event
   * @return {object} state
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, loading: true });
    this.props.resetPassword(this.state.resetParams)
      .then(() => this.setState({ resetParams: { entry: '' }, loading: false }))
      .catch(({ response }) => this.setState({ errors: response.data, loading: false }));
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <ForgotPasswordForm
            resetParams={this.state.resetParams}
            onChange={this.updateFormState}
            onSubmit={this.onSubmit}
            errors={this.state.errors} />
          {this.state.loading && <Loader />}
        </div>
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  resetPassword: resetParams => dispatch(forgotPassword(resetParams)),
});

export default connect(null, mapDispatchToProps)(ForgotPasswordPage);

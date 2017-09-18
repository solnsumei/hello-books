import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';

/**
 *
 */
export default class SignUpPage extends React.Component {
  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      formParams: {
        firstName: '',
        surname: '',
        email: '',
        username: '',
        password: ''
      },
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
    /* eslint-disable */
    console.log(this.state);
    /* eslint-enable */
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

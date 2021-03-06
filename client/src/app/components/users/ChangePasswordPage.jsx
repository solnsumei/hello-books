import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import UserDetail from './UserDetail';
import BorrowedItem from './BorrowedItem';
import ChangePasswordForm from './ChangePasswordForm';
import TopTitle from '../common/TopTitle';
import { changeUserPassword } from '../../actions/userActions';
import Modal from '../common/Modal';
import actionTypes from '../../actions/actionTypes';
import borrowActions from '../../actions/borrowActions';

/**
 * Updates the user password
 * @extends React.Component
 */
class ChangePasswordPage extends React.Component {
  /**
   * Initialize props and state
   * @method constructor
   * @param  {Object} props
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      passwordObject: {
        oldPassword: '',
        password: '',
        password_confirmation: ''
      },
      errors: {},
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.changeUserPassword = this.changeUserPassword.bind(this);
  }

  /**
   * Change user password
   * @method changeUserPassword
   * @param  {Object} event
   * 
   * @return {void}
   */
  changeUserPassword(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.changePassword(this.state.passwordObject)
      .then(() => {
        this.props.history.replace('/profile');
      })
      .catch(({ response }) => {
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
        } else if (response.data.error) {
          toastr.error(response.data.error);
        }
      });
  }

  /**
   * Update form state
   * @param {object} event
   * 
   * @returns {object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const passwordObject = this.state.passwordObject;
    passwordObject[field] = event.target.value;
    return this.setState({ passwordObject });
  }

  /**
  * Renders components

  * @return {Object} jsx
  */
  render() {
    // if user logged in through google redirect them
    if (this.props.user.googleUser) {
      return (
        <Redirect to='/profile' />
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col s12">
            <ChangePasswordForm
              passwordObject={this.state.passwordObject}
              onChange={this.updateFormState}
              onSubmit={this.changeUserPassword}
              errors={this.state.errors}/>
            }
          </div>
        </div>
      </div>
    );
  }
}

ChangePasswordPage.propTypes = {
  user: PropTypes.object.isRequired,
  changePassword: PropTypes.func,
  updateFormState: PropTypes.func
};

/**
 * Maps redux state to class props
 * @param {Object} state 
 * @param {Object} ownProps
 * 
 * @returns {Object} props
 */
const mapStateToProps = (state, ownProps) => ({
  user: state.user,
});

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * 
 * @returns {Object} actions
 */
const mapDispatchToProps = dispatch => ({
  changePassword: passwordObject => dispatch(changeUserPassword(passwordObject))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);

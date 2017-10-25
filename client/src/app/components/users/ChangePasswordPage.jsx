import React from 'react';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
 *
 */
class ChangePasswordPage extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
   */
  constructor(props) {
    super(props);

    this.state = {
      passwordObject: {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      errors: {},
    };

    this.updateFormState = this.updateFormState.bind(this);
    this.changeUserPassword = this.changeUserPassword.bind(this);
  }

  /**
   * [updateUser description]
   * @method updateUser
   * @param  {[type]}   event [description]
   * @return {[type]}         [description]
   */
  changeUserPassword(event) {
    const Materialize = window.Materialize;
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.changePassword(this.state.passwordObject)
      .then(({ data }) => {
        Materialize.toast(data.message, 2500, 'green');
        this.props.history.replace('/profile');
      })
      .catch(({ response }) => {
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
        } else if (response.data.error) {
          Materialize.toast(response.data.error, 4000, 'red darken-3');
        }
      });
  }

  /**
   * @param {object} event
   * @returns {object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const passwordObject = this.state.passwordObject;
    passwordObject[field] = event.target.value;
    return this.setState({ passwordObject });
  }

  /**
  * [render description]
  * @return {[type]} [description]
  */
  render() {
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

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
});


const mapDispatchToProps = dispatch => ({
  changePassword: passwordObject => dispatch(changeUserPassword(passwordObject))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);
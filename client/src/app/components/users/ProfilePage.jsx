import React from 'react';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserDetail from './UserDetail';
import BorrowedItem from './BorrowedItem';
import EditProfileForm from './EditProfileForm';
import TopTitle from '../common/TopTitle';
import { updateUserAccount, getUserProfile } from '../../actions/userActions';
import Modal from '../common/Modal';
import actionTypes from '../../actions/actionTypes';
import borrowActions from '../../actions/borrowActions';

/**
 * Shows the user profile page
 * handles profile update
 * @extends React.Component
 */
class ProfilePage extends React.Component {
  /**
   * Initializes props and state
   * @method constructor
   * @param  {Object} props
   * 
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      editUser: false,
    };

    this.onShowUpdateForm = this.onShowUpdateForm.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.closeEditProfileForm = this.closeEditProfileForm.bind(this);
  }

  /**
   * Fetch user when component mounts
   * @memberof ProfilePage
   * 
   * @returns {void}
   */
  componentWillMount() {
    this.props.getUserDetails();
  }

  /**
   * Update user profile method
   * @method updateUser
   * @param  {Object} event
   * 
   * @return {Object} response
   */
  updateUser(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.updateUser(this.state.user)
      .then(() => this.setState({
        editUser: false
      }))
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
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }

  /**
   * Show the update form
   * @method onShowUpdateForm
   * @param  {Object} event
   *
   * @return {function} setState
   */
  onShowUpdateForm(event) {
    event.preventDefault();
    this.setState({
      user: this.props.user,
      editUser: true
    });
  }

  /**
   * Close Edit profile form
   * @method closeEditProfileForm
   * @param  {Object} event
   * 
   * @return {function} setState 
   */
  closeEditProfileForm(event) {
    event.preventDefault();
    this.setState({ editUser: false });
  }
  /**
  * Renders the profile page
  * @return {[type]} [description]
  */
  render() {
    return (
      <div>
        <div className="row">
          { !this.state.editUser ? <UserDetail
            user={this.props.user}
            borrowedCount={this.props.borrowedCount}
            noOfBooksNotReturned={this.props.noOfBooksNotReturned}
            onClickEdit={this.onShowUpdateForm}
          /> :
            <EditProfileForm
              closeForm={this.closeEditProfileForm}
              user={this.state.user}
              onChange={this.updateFormState}
              onSubmit={this.updateUser}
              errors={this.state.errors}/>
          }
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func,
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
  updateUser: user => dispatch(updateUserAccount(user)),
  getUserDetails: () => dispatch(getUserProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

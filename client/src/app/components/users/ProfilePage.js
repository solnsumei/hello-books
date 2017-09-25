import React from 'react';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserDetail from './UserDetail';
import BorrowedItem from './BorrowedItem';
import EditProfileForm from './EditProfileForm';
import TopTitle from '../common/TopTitle';
import { updateUserAccount } from '../../actions/userActions';

/**
 *
 */
class ProfilePage extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
   */
  constructor(props) {
    super(props);

    this.state = {
      user: Object.assign({}, this.props.user),
      errors: {},
      editUser: this.props.editUser
    };

    this.onShowUpdateForm = this.onShowUpdateForm.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.closeEditProfileForm = this.closeEditProfileForm.bind(this);
  }

  /**
   * [updateUser description]
   * @method updateUser
   * @param  {[type]}   event [description]
   * @return {[type]}         [description]
   */
  updateUser(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.dispatch(updateUserAccount(this.state.user))
      .catch(({ response }) => this.setState({ errors: response.data.errors }));
  }

  /**
   * @param {object} event
   * @returns {object} state
   */
  updateFormState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }

  /**
   * [onShowUpdateForm description]
   * @method onShowUpdateForm
   * @param  {[type]}         event [description]
   * @return {[type]}               [description]
   */
  onShowUpdateForm(event) {
    event.preventDefault();
    this.setState({ editUser: true });
  }

  /**
   * [closeEditProfileForm description]
   * @method onShowUpdateForm
   * @param  {[type]}         event [description]
   * @return {[type]}               [description]
   */
  closeEditProfileForm(event) {
    event.preventDefault();
    this.setState({ editUser: false });
  }
  /**
  * [render description]
  * @return {[type]} [description]
  */
  render() {
    return (
      <div>
        <div className="row">
          { !this.state.editUser ? <UserDetail
            user={this.props.user}
            onClickEdit={this.onShowUpdateForm}
          /> :
            <EditProfileForm
              membershipTypes={this.props.membershipTypes}
              closeForm={this.closeEditProfileForm}
              user={this.state.user}
              onChange={this.updateFormState}
              onSubmit={this.updateUser}
              errors={this.state.errors}/>
          }


          <div className="col s12 m8">
            <TopTitle icon="book" title="Books Not Returned" />

            <div className="divider"></div>

            <table className="responsive-table striped">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <BorrowedItem bookTitle="Kimberly Sun"
                  borrowDate="8-Sep-2017"
                  dueDate="23-Sep-2017"
                  isReturned="no"/>

                <BorrowedItem bookTitle="Ellis Chronicles"
                  borrowDate="2-Sep-2017"
                  dueDate="19-Sep-2017"
                  isReturned="no"/>
              </tbody>
            </table>

            <small>
              <Link to="/borrow-history" className="btn waves-effect waves-light grey black-text">
                  History
              </Link>
            </small>

          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  editUser: PropTypes.bool.isRequired,
  updateFormState: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const membershipTypesFormatted = state.membershipTypes.map(membershipType => (
    {
      value: membershipType.membershipType,
      text: membershipType.membershipType
    }));

  return ({
    user: state.user,
    editUser: false,
    membershipTypes: membershipTypesFormatted
  });
};

export default connect(mapStateToProps)(ProfilePage);

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
import Modal from '../common/Modal';
import actionTypes from '../../actions/actionTypes';
import borrowActions from '../../actions/borrowActions';

/**
 *
 */
class ProfilePage extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {Object} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      user: Object.assign({}, this.props.user),
      errors: {},
      editUser: false,
    };

    this.onShowUpdateForm = this.onShowUpdateForm.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.closeEditProfileForm = this.closeEditProfileForm.bind(this);
  }

  /**
   * [updateUser description]
   * @method updateUser
   * @param  {Object} event
   * @return {void}
   */
  updateUser(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.updateUser(this.state.user)
      .catch(({ response }) => {
        if (response.data.errors) {
          this.setState({ errors: response.data.errors });
        } else if (response.data.error) {
          toastr.error(response.data.error);
        }
      });
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
   * [componentWillUpdate description]
   * @method componentWillUpdate
   * @param  {[type]}            nextProps [description]
   * @param  {[type]}            nextState [description]
   * @return {[type]}                      [description]
   */
  componentWillUpdate(nextProps, nextState) {
    if (!this.state.editUser && nextState.editUser) {
      $(document).ready(() => {
        // $('#select-field').material_select();
      });
    }
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
  borrowedBooks: PropTypes.array,
  updateUser: PropTypes.func,
  updateFormState: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  let booksNotReturned = [];
  booksNotReturned =
  state.borrowedBooks.filter(borrowedBook => borrowedBook.returned === false);

  return ({
    user: state.user,
    borrowedCount: state.borrowedBooks.length,
    noOfBooksNotReturned: booksNotReturned.length,
    borrowedBooks: booksNotReturned,
  });
};

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUserAccount(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

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
import { returnBook } from '../../actions/borrowActions';

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
      editUser: this.props.editUser,
      borrowedBook: {
        Book: {
          title: ''
        }
      }
    };

    this.onShowUpdateForm = this.onShowUpdateForm.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.closeEditProfileForm = this.closeEditProfileForm.bind(this);
    this.confirmReturn = this.confirmReturn.bind(this);
    this.showReturnModal = this.showReturnModal.bind(this);
  }

  /**
   * [showReturnModal description]
   * @method showReturnModal
   * @param  {[type]}        borrowedBook [description]
   * @return {[type]}                     [description]
   */
  showReturnModal(borrowedBook) {
    this.setState({ borrowedBook });
    $('.modal').modal('open');
  }

  /**
   * [showReturnModal description]
   * @method showReturnModal
   * @param  {[type]}        borrowedBook [description]
   * @return {[type]}                     [description]
   */
  confirmReturn() {
    $('.modal').modal('close');

    this.props.returnBook(this.props.user, this.state.borrowedBook.bookId)
      .catch(({ response }) => toastr.error(response.data.error));

    this.setState({
      borrowedBook: {
        Book: {
          title: ''
        }
      }
    });
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
                { Object.keys(this.props.borrowedBooks).length > 0 ?
                  this.props.borrowedBooks.map(borrowedBook =>
                    <BorrowedItem key={borrowedBook.id}
                      action={selectedBook =>
                        this.showReturnModal(borrowedBook)}
                      borrowedBook={borrowedBook} />
                  ) :
                  <tr>
                    <td colSpan="4" className="center-align">
                      No borrowed books added
                    </td>
                  </tr>
                }
              </tbody>
            </table>

            <small>
              <Link to="/borrow-history" className="btn waves-effect waves-light grey black-text">
                  History
              </Link>
            </small>

          </div>
        </div>
        <Modal id="modal1"
          title="Confirm Return"
          text={`Do you want to return book with title ${this.state.borrowedBook.Book.title}`}
          action={this.confirmReturn}
        />;
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  borrowedBooks: PropTypes.array,
  editUser: PropTypes.bool.isRequired,
  updateUser: PropTypes.func,
  updateFormState: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  let booksNotReturned = [];
  booksNotReturned =
  state.borrowedBooks.filter(borrowedBook => borrowedBook.returned === false);

  const membershipTypesFormatted = state.membershipTypes.map(membershipType => (
    {
      value: membershipType.membershipType,
      text: membershipType.membershipType
    }));

  return ({
    user: state.user,
    borrowedBooks: booksNotReturned,
    editUser: false,
    membershipTypes: membershipTypesFormatted
  });
};

const mapDispatchToProps = dispatch => ({
  returnBook: (user, bookId) => dispatch(returnBook(user, bookId)),
  updateUser: user => dispatch(updateUserAccount(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BorrowedItem from './BorrowedItem';
import TopTitle from '../common/TopTitle';
import Modal from '../common/Modal';
import { returnBook } from '../../actions/borrowActions';

/**
 *
 */
class BorrowHistoryPage extends React.Component {
  /**
  * [constructor description]
  * @method constructor
  * @param  {[type]}    props [description]
  * @return {[type]}          [description]
 */
  constructor(props) {
    super(props);

    this.state = {
      borrowedBook: {
        Book: {
          title: ''
        }
      }
    };

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
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">

            <TopTitle icon="list" title="Borrow History" />

            <div className="divider"></div>
            <table className="responsive-table striped">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Returned</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                { Object.keys(this.props.borrowedBooks).length > 0 ?
                  this.props.borrowedBooks.map(borrowedBook =>
                    <BorrowedItem key={borrowedBook.id}
                      page="historyPage"
                      action={selectedBook =>
                        this.showReturnModal(borrowedBook)}
                      borrowedBook={borrowedBook} />
                  ) :
                  <tr>
                    <td colSpan="5" className="center-align">
                      No books added
                    </td>
                  </tr>
                }
              </tbody>
            </table>
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

const mapStateToProps = (state, ownProps) => {
  let borrowedBooks = [];
  borrowedBooks = state.borrowedBooks.sort((a, b) => (b.id - a.id));
  return ({
    borrowedBooks,
    user: state.user
  });
};

const mapDispatchToProps = dispatch => ({
  returnBook: (user, bookId) => dispatch(returnBook(user, bookId))
});

export default connect(mapStateToProps, mapDispatchToProps)(BorrowHistoryPage);

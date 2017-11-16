import React from 'react';
import toastr from 'toastr';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BorrowedItem from './BorrowedItem';
import TopTitle from '../common/TopTitle';
import Modal from '../common/Modal';
import actionTypes from '../../actions/actionTypes';
import borrowActions from '../../actions/borrowActions';

/**
 *
 */
class BorrowHistoryPage extends React.Component {
  /**
  * [constructor description]
  * @method constructor
  * @param  {Object} props
  * @return {void} 
 */
  constructor(props) {
    super(props);

    this.state = {
      borrowedBook: {
        book: {
          title: ''
        }
      }
    };

    this.confirmReturn = this.confirmReturn.bind(this);
    this.showReturnModal = this.showReturnModal.bind(this);
  }

  /**
   * Method to show modal to confirm returning book
   * @method showReturnModal
   * @param  {Object} borrowedBook [description]
   * @return {void}
   */
  showReturnModal(borrowedBook) {
    this.setState({ borrowedBook });
    $('.modal').modal('open');
  }

  /**
   * Confirm book return to library
   * @method confirmReturn
   * @param  {Object} borrowedBook
   * @return {void}
   */
  confirmReturn() {
    $('.modal').modal('close');

    this.props.returnBook(this.props.user, this.state.borrowedBook.bookId);

    this.setState({
      borrowedBook: {
        book: {
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
            <div className="card">
              <div className="card-content">
                <div className="row">
                  <span className="right">
                    {this.props.returnedQueryString ?
                      <Link to="borrow-history" className="btn">
                        <i className="material-icons">arrow_back</i> Back
                      </Link>
                      :
                      <Link to="borrow-history?returned=false" className="btn">
                        Books Not Returned
                      </Link>
                    }
                  </span>
                </div>
                <table className="responsive-table striped">
                  <thead>
                    <tr>
                      <th>Book Title</th>
                      <th>Borrow Date</th>
                      <th>Due Date</th>
                      <th>Returned</th>
                      <th>Return Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    { this.props.borrowedBooks.length > 0 ?
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
          </div>
        </div>
        <Modal id="modal1"
          title="Confirm Return"
          text={`Do you want to return book with title ${this.state.borrowedBook.book.title}`}
          action={this.confirmReturn}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let borrowedBooks = state.borrowedBooks.sort((a, b) => (b.id - a.id));
  let returnedQueryString = ownProps.location.search;

  if (returnedQueryString) {
    returnedQueryString = queryString.parse(returnedQueryString);
  }

  if (returnedQueryString.returned) {
    borrowedBooks =
    borrowedBooks.filter(borrowedBook => !borrowedBook.returned);
  }

  return ({
    returnedQueryString,
    user: state.user,
    borrowedBooks
  });
};

const mapDispatchToProps = dispatch => ({
  returnBook: (user, bookId) =>
    dispatch(borrowActions(actionTypes.RETURN_BOOK, user, bookId))
});

export default connect(mapStateToProps, mapDispatchToProps)(BorrowHistoryPage);

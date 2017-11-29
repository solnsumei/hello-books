import React from 'react';
import toastr from 'toastr';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BorrowedItem from './BorrowedItem';
import TopTitle from '../common/TopTitle';
import Pagination from '../common/Pagination';
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
   * Load user's borrowed books
   * @memberof BorrowHistoryPage
   * @returns {void}
   */
  componentDidMount() {
    if (this.props.queryParams.returned && (this.props.queryParams.returned === 'true' ||
    this.props.queryParams.returned === 'false')) {
      this.props.loadBooksNotReturned(this.props.queryParams.returned);
    } else if (parseInt(this.props.queryParams.page, 10)) {
      this.props.loadBorrowedBooks(this.props.queryParams.page, this.props.perPage);
    } else {
      this.props.loadBorrowedBooks(null, this.props.perPage);
    }

    $('.modal').modal();
  }

  /**
   * 
   * @param {any} nextProps 
   * @memberof BorrowHistoryPage
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (!this.props.queryParams.returned && nextProps.queryParams.returned) {
      this.props.loadBooksNotReturned(nextProps.queryParams.returned);
    } else if (this.props.queryParams.returned && !nextProps.queryParams.returned) {
      this.props.loadBorrowedBooks(null, nextProps.perPage);
    } else if (this.props.queryParams.page !== nextProps.queryParams.page) {
      this.props.loadBorrowedBooks(nextProps.queryParams.page, nextProps.perPage);
    }
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

    this.props.returnBook(this.state.borrowedBook.bookId, this.props.queryParams.returned);

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
                    {this.props.queryParams.returned ?
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
                        <td colSpan="6" className="center-align">
                          Nothing to show
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {!this.props.queryParams.returned && (this.props.itemCount > this.props.perPage) &&
          <Pagination
            itemCount={this.props.itemCount}
            perPage={this.props.perPage}
            pageNumber={this.props.queryParams.page}
            pageUrl={this.props.location.pathname}
          />
        }
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
  let queryParams = ownProps.location.search;

  if (queryParams) {
    queryParams = queryString.parse(queryParams);
  }

  return ({
    perPage: 20,
    itemCount: state.itemCount.borrowedBooks,
    queryParams,
    user: state.user,
    borrowedBooks: state.borrowedBooks.sort((a, b) => (b.id - a.id))
  });
};

const mapDispatchToProps = dispatch => ({
  returnBook: (bookId, returned) =>
    dispatch(borrowActions(actionTypes.RETURN_BOOK, bookId, returned)),
  loadBorrowedBooks: (page = null, limit = null) =>
    dispatch(borrowActions(actionTypes.LOAD_BORROWED_BOOKS, page, limit)),
  loadBooksNotReturned: returned =>
    dispatch(borrowActions(actionTypes.LOAD_BOOKS_NOT_RETURNED, returned))
});

export default connect(mapStateToProps, mapDispatchToProps)(BorrowHistoryPage);

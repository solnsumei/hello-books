import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import BookList from './BookList';
import AddQuantityModal from './AddQuantityModal';
import { addStockQuantity } from '../../../actions/bookActions';

/**
 * [className description]
 * @type {String}
 */
class BooksPage extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {[type]}    props [description]
   * @return {[type]}          [description]
   */
  constructor(props) {
    super(props);

    this.state = {
      book: {},
      quantity: 1,
      error: ''
    };

    this.updateQuantityFormState = this.updateQuantityFormState.bind(this);
    this.saveQuantity = this.saveQuantity.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
  }

  /**
   * ]
   * @method onEdit
   * @param  {[type]} book [description]
   * @return {[type]}          [description]
   */
  addQuantity(book) {
    this.setState({
      book: Object.assign({}, book),
      quantity: 1,
      error: ''
    });

    $('#add-quantity-modal').modal('open');
  }

  /**
   * @param {object} event
   * @returns {object} state
   */
  updateQuantityFormState(event) {
    const quantity = event.target.value;
    if (!quantity || quantity <= 0) return this.setState({ quantity: 1 });
    return this.setState({ quantity });
  }

  /**
   * [saveCategory description]
   * @method saveCategory
   * @param  {[type]} event [description]
   * @return {[type]} [description]
   */
  saveQuantity(event) {
    event.preventDefault();
    this.setState({ error: '' });
    this.props.addStockQuantity(this.state.book, this.state.quantity)
      .then(() => {
        $('.modal').modal('close');
        toastr.success('Quantity added successfully');
        this.setState({ quantity: 1 });
      })
      .catch(({ response }) => {
        if (response.data.error) {
          this.setState({ error: response.data.error });
        }
      });
  }

  /**
   * [render description]
   * @method render
   * @return {[type]} [description]
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <p className="card-title teal-text">
                  <b>Book List</b>
                  <span className="right">
                    <Link to="/admin/books/create">
                      <button className="btn-floating waves-effect waves-green">
                        <i className="material-icons">add</i>
                      </button>
                    </Link>
                  </span>
                </p>
                <br/>
                <div className="divider"></div>
                <BookList
                  books={this.props.books}
                  onClickAddQuantity={this.addQuantity}
                  onDelete={this.onDelete}
                />

                <AddQuantityModal
                  quantity={this.state.quantity}
                  error={this.state.error}
                  onSubmit={this.saveQuantity}
                  onChange={this.updateQuantityFormState}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  books: state.books
});

const mapDispatchToProps = dispatch => ({
  addStockQuantity: (book, quantity) => dispatch(addStockQuantity(book, quantity))
});

BooksPage.propTypes = {
  books: PropTypes.array.isRequired,
  book: PropTypes.object,
  addStockQuantity: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);

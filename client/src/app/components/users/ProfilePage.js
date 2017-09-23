import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserDetail from './UserDetail';
import BorrowedItem from './BorrowedItem';
import TopTitle from '../common/TopTitle';

/**
 *
 */
class ProfilePage extends React.Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="row">
          <UserDetail user={user} />

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
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfilePage);

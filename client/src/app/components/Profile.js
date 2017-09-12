import React from 'react';
import { Link } from 'react-router-dom';
import UserDetail from './UserDetail';
import BorrowedItem from './BorrowedItem';
/**
 *
 */
export default class BorrowHistory extends React.Component {
/**
 * [render description]
 * @return {[type]} [description]
 */
  render() {
    return (
      <div className="container">
        <div className="row">
          <UserDetail name="Solomon Nsumei"
            email="solnsumei@gmail.com"
            username="solmei"
            membershipType="Gold" />

          <div className="col s8 m8">
            <h3 className="teal-text">
              <strong>
                <i className="material-icons">book</i> Borrowed Books Not Returned
              </strong>
            </h3>

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
                  isReturned="yes"/>

                <BorrowedItem bookTitle="Ellis Chronicles"
                  borrowDate="2-Sep-2017"
                  dueDate="19-Sep-2017"
                  isReturned="no"/>
              </tbody>
            </table>

            <small>
              <Link to="/borrow-history" className="btn waves-effect waves-light gray black-text">
                  History
              </Link>
            </small>

          </div>
        </div>
      </div>
    );
  }
}

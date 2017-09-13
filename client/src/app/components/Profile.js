import React from 'react';
import { Link } from 'react-router-dom';
import UserDetail from './UserDetail';
import BorrowedItem from './BorrowedItem';
import TopTitle from './TopTitle';

/**
 *
 */
export default class Profile extends React.Component {
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

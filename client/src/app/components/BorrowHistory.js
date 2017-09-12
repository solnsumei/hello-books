import React from 'react';
import { Link } from 'react-router-dom';
import BorrowedItem from './BorrowedItem';
import TopTitle from './TopTitle';
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
                <BorrowedItem bookTitle="Kimberly Sun"
                  borrowDate="8-Sep-2017"
                  dueDate="23-Sep-2017"
                  borrowHistory="1"
                  isReturned="yes"/>

                <BorrowedItem bookTitle="Ellis Chronicles"
                  borrowDate="2-Sep-2017"
                  dueDate="19-Sep-2017"
                  borrowHistory="1"
                  isReturned="no"/>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import { Link } from 'react-router-dom';
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Name</th>
                <th>Item Price</th>
              </tr>
            </thead>

            <tbody>
              <BorrowedItem bookTitle="Kimberly Sun"
                borrowDate="8-Sep-2017"
                dueDate="23-Sep-2017"
                returned="yes"/>

              <BorrowedItem bookTitle="Ellis Chronicles"
                borrowDate="2-Sep-2017"
                dueDate="19-Sep-2017"
                returned="no"/>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

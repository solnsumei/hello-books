import React from 'react';

const BorrowedItem = props => (
  <tr>
    <td>{props.bookTitle}</td>
    <td>{props.borrowDate}</td>
    <td>{props.dueDate}</td>
    <td class="text-teal">Yes</td>
    <td></td>
  </tr>
);

export default BorrowedItem;

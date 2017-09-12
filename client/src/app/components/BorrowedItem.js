import React from 'react';

const BorrowedItem = (props) => {
  const historyPage = props.borrowHistory ? <td>{props.isReturned}</td> : null;

  const returned = props.isReturned ?
    <button className="btn waves-effect waves-light blue" name="action">
      Return
    </button> : '-';

  return (
    <tr>
      <td>{props.bookTitle}</td>
      <td>{props.borrowDate}</td>
      <td>{props.dueDate}</td>
      {historyPage}
      <td>
        { returned }
      </td>
    </tr>
  );
};

export default BorrowedItem;

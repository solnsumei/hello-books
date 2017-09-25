import React from 'react';
import PropTypes from 'prop-types';

const MembershipTypeRow = ({ membershipType, onClickEdit }) => (
  <tr>
    <td>{membershipType.membershipType}</td>
    <td>{membershipType.lendDuration}</td>
    <td>{membershipType.maxBorrowable}</td>
    <td>
      <a title="edit" href="#" onClick={onClickEdit}
        data-id={membershipType.id} className="btn-floating orange">
        <i className="material-icons">edit</i>
      </a>
    </td>
  </tr>
);

MembershipTypeRow.propTypes = {
  membershipType: PropTypes.object.isRequired,
  onClickEdit: PropTypes.func
};

export default MembershipTypeRow;

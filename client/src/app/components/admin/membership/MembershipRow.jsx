import React from 'react';
import PropTypes from 'prop-types';

const MembershipRow = ({ membership, onClickEdit }) => (
  <tr>
    <td>{membership.level}</td>
    <td>{membership.lendDuration}</td>
    <td>{membership.maxBorrowable}</td>
    <td>
      <button id={`edit-level-${membership.id}`} title="edit" onClick={onClickEdit}
        data-id={membership.id} className="btn-floating orange">
        <i className="material-icons">edit</i>
      </button>
    </td>
  </tr>
);

MembershipRow.propTypes = {
  membership: PropTypes.object.isRequired,
  onClickEdit: PropTypes.func
};

export default MembershipRow;

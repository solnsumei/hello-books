import React from 'react';
import PropTypes from 'prop-types';
import MembershipRow from './MembershipRow';

/**
 * MembershipList react component
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const MembershipList = ({ memberships, onEdit }) => (
  <table className="responsive-table striped bordered">
    <thead>
      <tr>
        <th>Level</th>
        <th>Lend Duration (days)</th>
        <th>Max Books Borrowable</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {memberships.map(membership =>
        <MembershipRow key={membership.id}
          onClickEdit={membershipType => onEdit(membership)} membership={membership} />
      )}
    </tbody>
  </table>
);

MembershipList.propTypes = {
  memberships: PropTypes.array,
  onEdit: PropTypes.func
};

export default MembershipList;

import React from 'react';
import PropTypes from 'prop-types';
import MembershipTypeRow from './MembershipTypeRow';

const MembershipTypeList = ({ membershipTypes, onEdit }) => (
  <table className="responsive-table striped bordered">
    <thead>
      <tr>
        <th>Membership Type</th>
        <th>Lend Duration (days)</th>
        <th>Max Books Borrowable</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {membershipTypes.map(membershipType =>
        <MembershipTypeRow key={membershipType.id}
          onClickEdit={membership => onEdit(membershipType)} membershipType={membershipType} />
      )}
    </tbody>
  </table>
);

MembershipTypeList.propTypes = {
  membershipTypes: PropTypes.array,
  onEdit: PropTypes.func
};

export default MembershipTypeList;

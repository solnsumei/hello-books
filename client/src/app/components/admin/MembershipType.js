import React from 'react';
import PropTypes from 'prop-types';
import MembershipTypeRow from './MembershipTypeRow';

const MembershipType = ({ membershipTypes, onEdit }) => (
  <div className="col s12">
    <h4><b>Membership Types</b></h4>
    <div className="divider"></div>
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
          <MembershipTypeRow key={membershipType.id} membershipType={membershipType} />
        )}
      </tbody>
    </table>
  </div>
);

MembershipType.propTypes = {
  membershipTypes: PropTypes.array,
  onEdit: PropTypes.func
};

export default MembershipType;

import React from 'react';

const TopTitle = props => (
  <h3 className="teal-text">
    <strong>
      <i className="material-icons">{props.icon}</i> {props.title}
    </strong>
  </h3>
);

export default TopTitle;

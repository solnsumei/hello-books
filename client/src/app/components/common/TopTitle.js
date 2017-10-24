import React from 'react';
import PropTypes from 'prop-types';

const TopTitle = ({ icon, title }) => (
  <div className="row">
    <div className="col s12">
      <h3 className="teal-text">
        <strong>
          {(icon !== null || icon !== '') &&
            <i className="material-icons">{icon}</i>}
          {title}
        </strong>
      </h3>

      <div className="divider"></div>
    </div>
  </div>
);

TopTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

export default TopTitle;

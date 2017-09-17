import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({ name, label, onChange, value, error, errorMsg }) => (
  <div className="row">
    <div className="file-input input-field col s12">
      <div className="btn">
        <span>File</span>
        <input type="file"
          name={name}
          value={value}
          onChange={onChange} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate"
          type="text" />
      </div>
      <label htmlFor={name} data-error={error && error !== '' ? error : errorMsg}> {label} </label>
    </div>
  </div>
);

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  errorMsg: PropTypes.string
};

export default FileInput;

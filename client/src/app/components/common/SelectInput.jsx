import React from 'react';
import PropTypes from 'prop-types';

/**
 * Select input component
 * @param {Object} props
 * 
 * @return {Object} jsx
 */
const SelectInput = ({ name, active, label, onChange, defaultOption, value, error, options }) => (
  <div className="row">
    <div className="col s12">
      <label htmlFor={name} className={active ? 'active' : ''} >{label}</label>
      <div className="select-box">
        <span className="caret"><small>▼</small></span>
        <select
          name={name}
          value={value}
          onChange={onChange}>
          <option value="" disabled>
            {defaultOption}
          </option>
          {options.map(option =>
            <option key={option.value} value={option.value}>
              {!option.text ? option.value : option.text}
            </option>
          )}
        </select>
      </div>
      { error && <label className="red-text">{error}</label>}
    </div>
  </div>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;

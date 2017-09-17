import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ name, label, onChange, defaultOption, value, error, options }) => (
  <div className="input-field col s12">
    <select
      className="browser-default"
      name={name}
      value={value}
      onChange={onChange}>
      <option value="" disabled selected>
        {defaultOption}
      </option>
      {options.map(option =>
        <option key={option.value} value={option.value}>{option.text}</option>
      )}
    </select>
    <label htmlFor={name}>{label}</label>
  </div>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;

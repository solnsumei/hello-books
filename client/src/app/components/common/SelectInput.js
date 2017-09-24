import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ name, active, label, onChange, defaultOption, value, error, options }) => (
  <div className="row">
    <div className="input-field col s12">
      <select
        name={name}
        value={value}
        onChange={onChange}>
        <option value="" disabled>
          {defaultOption}
        </option>
        {options.map(option =>
          <option key={option.value} value={option.value}>{option.text}</option>
        )}
      </select>
      { error ? <label htmlFor={name} data-error={error}>{label}</label> :
        <label htmlFor={name} className={active ? 'active' : ''} >{label}</label> }
    </div>
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

import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (
  { type, name, label, onChange, placeholder,
    value, error, errorMsg, required }) => (
  <div className="row">
    <div className="input-field col s12">
      { type === 'textarea' ?
        <textarea
          name={name}
          className="validate"
          onChange={onChange}
          required={required}>
          {value}
        </textarea>
        :
        <input
          type={type}
          name={name}
          className="validate"
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange} />
      }
      <label htmlFor={name} data-error={error && error !== '' ? error : errorMsg}> {label} </label>
    </div>
  </div>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.string,
  errorMsg: PropTypes.string
};

export default TextInput;

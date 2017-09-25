import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (
  { type, name, label, onChange, placeholder,
    value, error, errorMsg, active, required }) => (
  <div className="row">
    <div className="input-field col s12">
      { type === 'textarea' ?
        <textarea
          name={name}
          className={error ? 'invalid' : 'validate'}
          onChange={onChange}
          required={required}>
          {value}
        </textarea>
        :
        <input
          type={type}
          name={name}
          className={error ? 'invalid' : 'validate'}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange} />
      }
      <label htmlFor={name} className={active ? 'active' : ''} data-error={ !error ? errorMsg : error }>{label}</label>
    </div>
  </div>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.string,
  errorMsg: PropTypes.string
};

export default TextInput;

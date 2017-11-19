import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (
  { type, name, label, onChange, placeholder, prefix,
    value, error, errorMsg, active, required }) => (
  <div className="row">
    <div className="input-field col s12">
      { prefix && <i className="material-icons prefix">{prefix}</i> }
      { type === 'textarea' ?
        <textarea
          name={name}
          id="description"
          className={error ? 'materialize-textarea invalid' : 'materialize-textarea validate'}
          onChange={onChange}
          value={value}
          required={required}>
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
  type: PropTypes.string.isRequired,
  active: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.string,
  errorMsg: PropTypes.string
};

export default TextInput;

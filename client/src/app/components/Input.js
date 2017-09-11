import React from 'react';

const Input = (props) => {
  if (props.type === 'textarea') {
    return (
      <div className="row">
        <div className="input-field col s12">
          <textarea name={props.id} id={props.id}
            className={props.className}></textarea>
          <label> {props.name} </label>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="input-field col s12">
        <input type={props.type} id={props.id} name={props.id}
          className={props.className} />
        <label> {props.name} </label>
      </div>
    </div>
  );
};

export default Input;

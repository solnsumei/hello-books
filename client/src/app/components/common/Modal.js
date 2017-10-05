import React from 'react';

const Modal = props => (
  <div id={props.id} className="modal">
    <div className="modal-content">
      <h4>{props.title}</h4>
      <p>{props.text}</p>
    </div>
    <div className="modal-footer">
      <button type="button"
        className="modal-action modal-close waves-effect waves-green btn-flat">
        Cancel
      </button>

      <button type="button"
        onClick={props.onDelete} className="waves-effect waves-green btn-flat">
        Confirm
      </button>
    </div>
  </div>
);

export default Modal;

import React from 'react';

const Modal = ({ id, title, text, action }) => (
  <div id={id} className="modal">
    <div className="modal-content">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
    <div className="modal-footer">
      <button type="button"
        className="modal-action modal-close waves-effect waves-green btn-flat">
        Cancel
      </button>

      <button type="button"
        onClick={action} className="waves-effect waves-green btn-flat">
        Confirm
      </button>
    </div>
  </div>
);

export default Modal;
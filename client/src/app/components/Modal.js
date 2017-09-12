import React from 'react';

const Modal = props => (
  <div id={props.id} class="modal">
    <div className="modal-content">
      <h4>{props.title}</h4>
      <p>{props.text}</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">
        Agree
      </a>
    </div>
  </div>
);

export default Modal;

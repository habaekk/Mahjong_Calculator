import React from 'react';
import './Modal.css';
import GridComponent from './ScoreGrid'; // Import the 12x14 grid component

const Modal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <GridComponent />
      </div>
    </div>
  );
};

export default Modal;

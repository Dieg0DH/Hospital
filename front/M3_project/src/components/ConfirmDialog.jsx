import React from "react";
import "./ConfirmDialog.css";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog-container">
      <div className="confirm-dialog">
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button className="confirm-dialog-cancel-button" onClick={onCancel}>
            No, Keep it
          </button>
          <button className="confirm-dialog-confirm-button" onClick={onConfirm}>
            Yes, Cancel the Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

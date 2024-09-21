import React from "react";
import "../CSS/FieldPanel.css";

const FieldPanel = ({ isVisible, onClose, onEmailSelect, onPhoneSelect }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="field-panel-overlay">
      <div className="field-panel">
        <div className="field-panel-header">
          <h4>Add field</h4>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        <ul>
          <li onClick={() => { onEmailSelect(); onClose(); }}>
            <span className="icon">📧</span>
            <span className="label">Email</span>
          </li>
          <li onClick={() => { onPhoneSelect(); onClose(); }}>
            <span className="icon">📞</span>
            <span className="label">Phone</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FieldPanel;
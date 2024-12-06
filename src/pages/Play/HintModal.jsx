import React from "react";
import "./HintModal.css";

const HintModal = ({ open, onClose, hint }) => {
  if (!open) return null;

  return (
    <div className="hint-modal">
      <div className="hint-content">
        <p>{hint}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default HintModal;

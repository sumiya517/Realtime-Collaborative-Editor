import React, { useState } from "react";
import "./index.scss";

const ButtonCombo = ({ onEdit, onDelete }) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="c-btn-combo">
      <div className="c-btn-combo__edit" onClick={onEdit}>
        <img className="c-btn-combo__icon"
          src={'/icons/edit-black.png'}

        />
        <span>Edit</span>
      </div>
      <div className="c-btn-combo__delete" onClick={onDelete}>
        <img className="c-btn-combo__icon"
          src={'/icons/delete-black.png'}

        />
        <span>Delete</span>
      </div>
    </div>
  );
};

export default ButtonCombo;

import React, { useRef } from "react";
import "./index.scss";

const AddNewWorkspace = ({onClick}) => {

  return (
    <div className="c-add-workspace-card" onClick={onClick}>
      <img className="c-add-workspace-card__img" src="/icons/add.png" />
      <span className="c-add-workspace-card__text">New Workspace</span>
    </div>
  );
};

export default AddNewWorkspace;

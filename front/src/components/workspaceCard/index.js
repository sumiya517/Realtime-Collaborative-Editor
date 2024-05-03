import React, { useRef, useState } from "react";
import "./index.scss";
import ButtonCombo from "../buttonCombo";
import { useDeleteWorkspaceMutation } from "../../redux/workspcaeSlice/workspaceSlice";
import { useNavigate } from "react-router-dom";

const WorkspaceCard = ({ onClick, workspaceId, theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteWorkspace] = useDeleteWorkspaceMutation()
  const navigate = useNavigate();

  const handleEditWorkspace = (id) => {
    navigate(`/workspace/${id}`);
  }

  const handleDelete = async (id) => {
    await deleteWorkspace(id)
    console.log(id);
  }
  return (
    <div className="c-workspace-card">
      <img className="c-workspace-card__img" src="/workspace-card-img.png" />
      <div className="c-workspace-card__details">
        <div className="c-workspace-card__details-section" onClick={onClick}>
          <span className="c-workspace-card__details-header">
            Workspace Name
          </span>
          <span className="c-workspace-card__details-modified">
            Modified By user.name
          </span>
        </div>
        <img
          className="c-workspace-card__details-menu"
          src="/icons/three-dots.png"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        {isMenuOpen && <ButtonCombo onDelete={() => handleDelete(workspaceId)} onEdit={() => handleEditWorkspace(workspaceId)} />}
      </div>
    </div>
  );
};

export default WorkspaceCard;

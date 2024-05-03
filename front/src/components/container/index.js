import React, { useState } from "react";
import "./index.scss";
import StickyNote from "../stickyNote";

const Container = ({ disable = true, width, template, handleDelete, handleOwner, owner, stickynotes, color,
  colors,
  active,
  onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [sticky, setSticky] = useState(stickynotes);

  console.log(width);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    setIsEditing(true);
  };



  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (id, event) => {
    event.stopPropagation();
    event.preventDefault();
    const updatedTextAreas = sticky.map((area) => {
      if (area.id === id) {
        return { ...area, content: event.target.value };
      }
      return area;
    });

    setSticky(updatedTextAreas);
    // socket.emit('textUpdate', updatedTextAreas); // Emit the updated areas
  };

  const handleDeleteSticky = (id) => {
    setSticky(sticky.filter((obj) => obj.id !== id))
  }

  console.log(stickynotes);

  return (
    <div className="c-container"
      style={{
        width: `${template == "temp-col" ? (width + "%") : "100%"}`,
      }}>
      <div className="c-container__header">
        <div className="c-container__header-detail">
          <span className="c-container__header-name">{owner ? owner.split('@')[0] : 'User Name'}</span>
          {isEditing ? (
            <input
              className="c-container__header-input"
              type="email"
              value={owner}
              onChange={handleOwner}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span className="c-container__header-input">{owner ? owner : 'Enter email'}</span>
          )}
        </div>
        <img
          className="c-container__header-menu"
          src={"/icons/edit-black.png"}
          onClick={handleEditClick}
        />
      </div>
      <div className={template == "temp-col" ? "c-container__body" : "c-container__body--row"}>
        {sticky.map((sticky) =>
          <StickyNote
            key={sticky.id}
            value={sticky.content}
            onChange={(value) => handleChange(0, value)}
            color={sticky.color}
            colors={colors}
            active={active}
            onClick={onClick}
            initialTop={sticky.coordinates.x}
            initialLeft={sticky.coordinates.y}
            parentWidth={800}
            parentHeight={600}
            handleDelete={() => handleDeleteSticky(sticky.id)}
          />
        )}
      </div>
      <div className="c-container__footer">
        <img
          src="/icons/delete-red.png"
          onClick={handleDelete}
        />
        <img
          src={`${isEditing
            ? "/icons/tick-circle-green.png"
            : "/icons/tick-circle.png"
            }`}
        />
      </div>
    </div>
  );
};

export default Container;

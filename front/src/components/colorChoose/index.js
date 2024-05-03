import React, { useState } from "react";
import "./index.scss";

const ColorChoose = ({colors,active,onClick}) => {
  return (
    <div className="c-palette">
      {colors?.map((color) => (
        <div
          className={`c-palette__color ${
            active === color && "c-palette__color--active"
          } `}
          style={{ background: `${color}` }}
          onClick={onClick}
        ></div>
      ))}
    </div>
  );
};

export default ColorChoose;

import React from "react";
import "./PenIcon.css";

const PenIcon = ({ type, size = 24 }) => {
  const iconPaths = {
    fountain: "/icons/fountain.svg",
    brush: "/icons/brush.svg",
    feather: "/icons/feather.svg",
    ballpoint: "/icons/ballpoint.svg"
  };

  const iconPath = iconPaths[type] || iconPaths.fountain;

  return (
    <div className="pen-icon-wrapper" style={{ width: size, height: size }}>
      <img
        src={iconPath}
        alt={type}
        className="pen-icon-image"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default PenIcon;

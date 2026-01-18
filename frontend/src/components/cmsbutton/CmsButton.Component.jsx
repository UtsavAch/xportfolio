import React from "react";
import { UilPlus, UilPen, UilTrash } from "@iconscout/react-unicons";
import { StyledCmsButton } from "./CmsButton.Style";

const CmsButton = ({ type, onClick, style, className }) => {
  const getIcon = () => {
    switch (type) {
      case "add":
        return <UilPlus size="24" />;
      case "edit":
        return <UilPen size="20" />;
      case "delete":
        return <UilTrash size="20" />;
      default:
        return null;
    }
  };

  return (
    <StyledCmsButton
      onClick={onClick}
      style={style}
      className={className}
      $variant={type} // Pass variant to style for conditional coloring
      type="button" // Prevent form submission if placed inside a form
    >
      {getIcon()}
    </StyledCmsButton>
  );
};

export default CmsButton;

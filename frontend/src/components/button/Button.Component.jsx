import React from "react";
import { StyledButton } from "./Button.Style";

const Button = ({
  type = "secondary", // 'primary' or 'secondary'
  onClick,
  children,
  icon,
  isSubmit = false,
}) => {
  return (
    <StyledButton
      $variant={type}
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
    >
      {children}
      {/* Icon wrapper to ensure consistent spacing if icon exists */}
      {icon && (
        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      )}
    </StyledButton>
  );
};

export default Button;

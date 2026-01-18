import React from "react";
import { TitleContainer, TitleText } from "./SectionTitle.Style";

const SectionTitle = ({ children, icon }) => {
  return (
    <TitleContainer>
      {icon && <span>{icon}</span>}
      <TitleText>{children}</TitleText>
    </TitleContainer>
  );
};

export default SectionTitle;

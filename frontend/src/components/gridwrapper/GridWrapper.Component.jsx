import React from "react";
import { StyledGrid } from "./GridWrapper.Style";

const GridWrapper = ({ children, columns = 2 }) => {
  return <StyledGrid $columns={columns}>{children}</StyledGrid>;
};

export default GridWrapper;

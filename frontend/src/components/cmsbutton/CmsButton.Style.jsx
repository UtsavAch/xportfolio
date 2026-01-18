import styled from "styled-components";

export const StyledCmsButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  /* Use red for delete, highlight color for others */
  color: ${(props) =>
    props.$variant === "delete" ? "#ff4d4d" : "var(--color-highlight)"};

  &:hover {
    opacity: 0.8;
  }
`;

import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  width: 100%;
  padding: 14px;
  font-family: var(--font-main);
  font-weight: var(--font-semibold);
  font-size: 1rem;
  border-radius: var(--radius);

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease-in-out;
  outline: none;

  /* Primary: Coloured border, transparent background */
  ${(props) =>
    props.$variant === "primary" &&
    css`
      background-color: transparent;
      border: 1px solid var(--color-button);
      color: var(--color-button);

      &:hover {
        /* Subtle background using the highlight color at low opacity */
        background-color: rgba(249, 178, 123, 0.1);
      }
    `}

  /* Secondary: Coloured background */
  ${(props) =>
    props.$variant === "secondary" &&
    css`
      background-color: var(--color-button);
      border: 1px solid var(--color-button);
      color: var(
        --color-icon-dark
      ); /* Dark text for contrast on light button */

      &:hover {
        opacity: 0.9;
        box-shadow: var(--shadow);
      }
    `}
`;

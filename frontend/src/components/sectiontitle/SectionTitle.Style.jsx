import styled from "styled-components";
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: relative;

  /* A small dot/line that "plugs into" the icon */
  &::before {
    content: "";
    position: absolute;
    left: -30px;
    width: 20px;
    height: 2px;
    background: var(--color-highlight);
    opacity: 0.5;
  }

  svg {
    background: var(--color-bg);
    padding: 5px;
    border: 1px solid var(--color-low-opacity-border);
    border-radius: 4px;
    z-index: 1;
  }
`;

export const TitleText = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-family: var(--font-main);
  font-weight: var(--font-semibold);

  /* Underline applied ONLY to the text */
  border-bottom: 2px solid var(--color-highlight);
  padding-bottom: 5px;
  display: inline-block;
`;

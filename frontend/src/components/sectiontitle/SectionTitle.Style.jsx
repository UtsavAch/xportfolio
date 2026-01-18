import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  /* Fixed subtle top margin */
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  color: var(--color-text);

  svg {
    color: var(--color-highlight);
    display: block;
    /* Ensures icon vertical alignment remains steady 
       even if text has an underline border */
    margin-bottom: 2px;
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

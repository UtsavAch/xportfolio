import styled from "styled-components";

export const StyledFooter = styled.footer`
  width: 100%;
  padding: 3rem 1rem;
  margin-top: 4rem;
  border-top: 1px solid var(--color-low-opacity-border);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: var(--font-main);
`;

export const QuoteText = styled.p`
  font-style: italic;
  color: var(--color-text);
  opacity: 0.8;
  font-size: 1rem;
  margin: 0;
`;

export const CopyrightText = styled.p`
  color: var(--color-highlight);
  font-weight: var(--font-semibold);
  font-size: 0.85rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

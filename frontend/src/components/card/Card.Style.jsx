import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: var(--color-card-bg);
  border: 1px solid var(--color-low-opacity-border);
  border-radius: var(--radius);
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease;
  font-family: var(--font-main);

  &:hover {
    border-color: var(--color-input-border);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const Title = styled.h3`
  color: var(--color-highlight);
  font-weight: var(--font-semibold);
  font-size: 1.2rem;
  margin: 0;
`;

export const Subtitle = styled.span`
  color: var(--color-text);
  font-size: 0.95rem;
  font-weight: var(--font-regular);
  display: block;
  margin-top: 4px;
`;

export const Meta = styled.div`
  color: var(--color-text);
  opacity: 0.6;
  font-size: 0.85rem;
  margin-top: 4px;
`;

export const Description = styled.p`
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 12px 0 0 0;
`;

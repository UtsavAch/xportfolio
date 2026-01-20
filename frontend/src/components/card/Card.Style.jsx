import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: var(--color-card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-low-opacity-border);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: var(--radius);
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1.5rem;

  transition:
    transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.3s ease;

  font-family: var(--font-main);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
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
  margin-bottom: 4px;
`;

export const Meta = styled.div`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-highlight);
  opacity: 0.8;
`;

export const Location = styled.div`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
`;

export const Description = styled.p`
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 12px 0 0 0;
`;

export const Divider = styled.div`
  width: 40px;
  height: 2px;
  background: var(--color-low-opacity-border);
  margin: 16px 0;
  border-radius: 2px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  gap: 16px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
`;

export const Tag = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: var(--font-semibold);
  color: var(--color-highlight);
  background: rgba(0, 225, 255, 0.08); /* Faint highlight background */
  padding: 4px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid var(--color-low-opacity-border);

  /* Add flex to align text and delete icon */
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const DeleteTagIcon = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: #ff4d4f; /* Red color for delete action */
  }
`;

export const VerticalDivider = styled.div`
  width: 2px;
  height: 20px;
  background: var(--color-low-opacity-border);
  flex-shrink: 0;
`;

export const ActionLinks = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0; /* Ensures the links block never squishes */

  a {
    color: var(--color-text);
    opacity: 0.6;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
      color: var(--color-highlight);
      opacity: 1;
      transform: translateY(-2px);
    }
  }
`;

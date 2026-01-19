import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: var(--color-card-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-low-opacity-border);
  /* Use a slightly softer initial shadow */
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: var(--radius);
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1.5rem;

  /* Smooth transition for both movement and shadow */
  transition:
    transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.3s ease;

  font-family: var(--font-main);

  &:hover {
    /* Lift the card up slightly */
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
`;

export const Meta = styled.div`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-highlight);
  opacity: 0.8;
`;

export const Description = styled.p`
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 12px 0 0 0;
`;

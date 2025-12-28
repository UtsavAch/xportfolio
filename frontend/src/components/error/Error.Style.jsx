import styled from "styled-components";

export const StyledError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #ff4d4d;
  background: rgba(255, 77, 77, 0.1);
  padding: 12px 16px;
  border-radius: var(--radius);
  font-family: var(--font-main);
  font-weight: var(--font-semibold);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 77, 77, 0.2);
  width: 100%;
  box-sizing: border-box;

  svg {
    flex-shrink: 0;
  }
`;

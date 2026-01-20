import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
`;

export const Loader = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-low-opacity-border);
  border-top: 4px solid var(--color-highlight);
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  margin-bottom: 1.5rem;
`;

export const LoadingText = styled.p`
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 1px;
  opacity: 0.8;
`;

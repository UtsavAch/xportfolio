import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;

export const StyledError = styled.div`
  /* Position it in front of everything */
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999; /* Higher than modals and headers */

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #000;
  background: #ff4d4d; /* Solid background so it's readable over content */
  padding: 12px 24px;
  border-radius: 8px;
  font-family: var(--font-main);
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid rgba(255, 77, 77, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  width: auto;
  min-width: 300px;
  max-width: 90%;
  box-sizing: border-box;

  animation: ${fadeIn} 0.3s ease-out;

  svg {
    flex-shrink: 0;
  }
`;

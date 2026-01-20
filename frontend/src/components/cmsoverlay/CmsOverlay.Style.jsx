import styled from "styled-components";

export const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  /* Added: allow the background to scroll if the modal is too large */
  padding: 20px;
  box-sizing: border-box;
`;

export const ModalContainer = styled.div`
  background-color: var(--color-card-bg);
  padding: 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  color: var(--color-text);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--color-low-opacity-border);
  font-family: var(--font-main);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* prevents the container itself from showing a double scrollbar */
`;

export const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 24px;
  text-transform: capitalize;
  font-size: 1.5rem;
  font-weight: var(--font-bold);
  color: var(--color-highlight);
  flex-shrink: 0; /* Ensures title doesn't compress */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* Added: make the fields scrollable */
  overflow-y: auto;
  padding-right: 8px; /* space for scrollbar */
  flex: 1;

  /* Custom Scrollbar for a cleaner look */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-low-opacity-border);
    border-radius: 10px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  flex-shrink: 0; /* Ensures buttons don't scroll away or compress */
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background: transparent;
  border: 1px solid var(--color-input-border);
  color: var(--color-text);
  border-radius: var(--radius);
  font-family: var(--font-main);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

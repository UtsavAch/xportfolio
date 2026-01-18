import styled from "styled-components";

export const ConfirmBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ConfirmModal = styled.div`
  background: var(--color-card-bg);
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const ConfirmMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: var(--text-color);
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const ActionButton = styled.button`
  padding: 10px 25px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  /* Variant logic: danger = red, primary = highlight color, default = gray */
  background-color: ${(props) => {
    if (props.$variant === "danger") return "#ff4d4d";
    if (props.$variant === "primary") return "var(--color-highlight)";
    return "#ccc";
  }};

  color: ${(props) => (props.$variant ? "white" : "#333")};

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

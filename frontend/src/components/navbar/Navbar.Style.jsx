import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-card-bg);
  border-radius: 12px;

  position: sticky;
  top: 0px; /* Distance from top of screen when scrolling */
  z-index: 1000; /* Ensures it floats above all other content */
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  margin: 20px auto;
  box-sizing: border-box;
  width: fit-content;
  max-width: 98%;

  /* Ultra-small screens (< 350px) */
  gap: 4px;
  padding: 4px;

  /* Standard Mobile (> 350px) */
  @media (min-width: 350px) {
    gap: 8px;
    padding: 6px;
  }

  /* Tablet/Desktop (> 768px) */
  @media (min-width: 768px) {
    gap: 10px;
    padding: 8px;
    max-width: 80%;
  }
`;

export const NavItem = styled.button`
  background: ${(props) =>
    props.$isActive ? "var(--color-button)" : "transparent"};
  color: ${(props) =>
    props.$isActive ? "var(--color-icon-dark)" : "var(--color-text)"};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-main);
  font-weight: var(--font-semibold);
  border-radius: 8px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Ultra-small screens (< 350px) */
  padding: 6px 8px;
  font-size: 0.75rem;
  letter-spacing: -0.2px;

  /* Standard Mobile (> 350px) */
  @media (min-width: 350px) {
    padding: 8px 12px;
    font-size: 0.8rem;
    letter-spacing: normal;
  }

  /* Tablet/Desktop (> 768px) */
  @media (min-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }

  &:hover {
    background: ${(props) =>
      !props.$isActive ? "rgba(255, 255, 255, 0.05)" : "var(--color-button)"};
  }
`;

import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: var(--color-card-bg);
  padding: 8px;
  border-radius: 12px;
  width: fit-content;
  margin: 20px auto;
`;

export const NavItem = styled.button`
  background: ${(props) =>
    props.$isActive ? "var(--color-button)" : "transparent"};
  color: ${(props) =>
    props.$isActive ? "var(--color-icon-dark)" : "var(--color-text)"};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-family: var(--font-main);
  font-weight: var(--font-semibold);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      !props.$isActive ? "rgba(255, 255, 255, 0.05)" : "var(--color-button)"};
  }
`;

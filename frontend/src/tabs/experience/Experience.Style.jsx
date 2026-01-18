import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: ${(props) => props.$marginTop || "0"};
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$gap || "10px"};
`;

export const LocationText = styled.span`
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  margin-right: 10px;
`;

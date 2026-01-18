import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: ${(props) => props.$marginTop || "0"};
`;

export const MainTitle = styled.h1`
  margin: 0;
`;

export const SectionTitle = styled.h2`
  margin: 0;
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.$gap || "10px"};
`;

export const ExternalLink = styled.a`
  color: var(--color-highlight);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

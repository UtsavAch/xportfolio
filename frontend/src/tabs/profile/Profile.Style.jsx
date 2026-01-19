import styled from "styled-components";

export const ProfileHero = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const PhotoContainer = styled.div`
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--color-highlight);
  box-shadow: var(--shadow);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  h1 {
    margin: 0;
    font-family: var(--font-main);
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const SubTitle = styled.h3`
  color: var(--color-highlight);
  margin-top: 0.5rem;
  font-weight: var(--font-semibold);
`;

export const SocialBar = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    color: var(--color-text);
    transition: color 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
      color: var(--color-highlight);
    }
  }
`;

export const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-text);
  font-size: 0.95rem;

  svg {
    color: var(--color-highlight);
  }
`;

export const CVButtonWrapper = styled.div`
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

export const ContactBar = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }

  a {
    color: var(--color-text);
    transition: color 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
      color: var(--color-highlight);
    }
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: var(--color-low-opacity-border);
  margin: 0 10px;
`;

export const LocationWrapper = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const BioText = styled.p`
  line-height: 1.6;
  margin-top: 1.5rem;
  color: var(--color-text);
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const LogoutWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
`;

import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-bg);
  text-align: center;
`;

export const Title = styled.h1`
  font-family: var(--font-bold);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
`;

export const Subtitle = styled.p`
  font-family: var(--font-main);
  color: var(--color-text);
  opacity: 0.7;
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 3rem;
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 380px;
  text-align: left;
`;

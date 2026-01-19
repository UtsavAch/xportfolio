import styled from "styled-components";

export const StyledWrapper = styled.section`
  /* Center the wrapper on the page */
  margin: 0 auto;

  /* Flexbox to center the actual content (cards/text) inside the wrapper */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Default: Small Screens (Mobile) */
  width: 95%;

  background-image:
    linear-gradient(var(--color-gradient-bg) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-gradient-bg) 1px, transparent 1px);
  background-size: 40px 40px;

  /* Medium Screens (Tablets/Ipads) */
  @media (min-width: 768px) {
    width: 80%;
  }

  /* Large Screens (Desktops) */
  @media (min-width: 1200px) {
    width: 60%;
  }

  /* Padding to ensure content doesn't touch screen edges on mobile */
  padding: 20px 0;

  /* Smooth transition for resizing windows */
  transition: width 0.3s ease-in-out;
`;

import React from "react";
import { StyledFooter, QuoteText, CopyrightText } from "./Footer.Style";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // You can easily change your quote here
  const favoriteQuote =
    "“It is founded on our thoughts and made up of our thoughts.”";

  return (
    <StyledFooter>
      <QuoteText>{favoriteQuote}</QuoteText>
      <CopyrightText>Copyright &copy; {currentYear} Utsav</CopyrightText>
      <p>✌🏼</p>
    </StyledFooter>
  );
};

export default Footer;

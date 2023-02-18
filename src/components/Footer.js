import React from 'react';
import styled from 'styled-components';

const PageFooter = styled.footer`
  display: flex;
  justify-content: center;
  background-color: #c3471b;
  margin-top: 20px;
  width: 100%;
  color: #fff;
  position: absolute;
  bottom: 0;
`;
const FooterP = styled.p`
  margin: 0.5em;
  @media (min-width: 667px) {
    font-size: 20px;
  }
`;

export const Footer = () => {
  return (
    <PageFooter>
      <FooterP>
        Emma &bull; Kristiina &bull; Lovisa &bull; Mimmi &bull; Suki
      </FooterP>
    </PageFooter>
  );
};

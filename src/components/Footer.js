import * as React from 'react';
import { Container } from '../components/Container';
import { footerData } from './text_data';
import { FooterWidget } from './FooterWidget';
import { Colors } from '../Colors';
import styled from '@emotion/styled';

const FooterTile = styled.footer`
  padding-top: 90px;
  background-color: ${Colors.bars};
  width: 100%;
`;
const Widget = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled.div`
  width: 100%;
  display: inline-block;
  padding: 31px 0 35px;

  p {
    font-size: 14;
    color: ${Colors.lightText};
    letter-spacing: 1px;
    text-align: left;

    @media screen and (max-width: 576px) {
      text-align: center;
    }
  }
`;

export class Footer extends React.Component {
  render() {
    return (
      <FooterTile>
        <Container>
          <Widget>
            {footerData.map((el) => (
              <FooterWidget key={el.title} title={el.title} links={el.links} linksTo={el.linksTo} />
            ))}
          </Widget>
          <Copy>
            <p>&copy; Copyright 2018 Graphqleditor.com</p>
          </Copy>
        </Container>
      </FooterTile>
    );
  }
}

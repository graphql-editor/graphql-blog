import * as React from 'react';
import { Colors } from '../Colors';
import styled from '@emotion/styled';

const Main = styled.div`
  display: flex;
  flex-flow: column nowrap;
  p {
    color: ${Colors.lightText};
    margin-bottom: 25px;
    letter-spacing: 1px;
  }
`;

const H4 = styled.h4`
  font-size: 16px;
  color: ${Colors.mainText};
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 28px;
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  margin-bottom: 14px;
`;

const ALink = styled.a`
  font-size: 14px;
  color: ${Colors.lightText};
  letter-spacing: 1px;
`;

export const FooterWidget = ({ title, links, linksTo }) => (
  <Main>
    <H4>{title}</H4>
    <Ul>
      {links.map((el, i) => (
        <Li key={el}>
          <ALink href={linksTo[i]}>{el}</ALink>
        </Li>
      ))}
    </Ul>
  </Main>
);

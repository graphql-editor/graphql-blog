import * as React from 'react';
import { rhythm } from '../utils/typography';
import { Colors } from '../Colors';
import styled from '@emotion/styled';

const UpButtonTile = styled.a`
  padding: ${rhythm(0.25)} ${rhythm(0.5)};
  font-size: ${rhythm(0.5)};
  font-weight: 500;
  box-shadow: none;
  background: transparent;
  text-decoration: none;
  color: ${Colors.lightText};
  cursor: pointer;
  &:hover {
    color: ${Colors.main};
  }
`;

export const UpButton = ({ children, onClick, href = '#' }) => (
  <UpButtonTile href={href} onClick={onClick}>
    {children}
  </UpButtonTile>
);

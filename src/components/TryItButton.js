import * as React from 'react';
import { auth } from '../utils/auth';
import { ColorsSystem } from '../Colors';
import styled from '@emotion/styled';

const ATile = styled.a`
  box-shadow: none;
  display: inline-flex;
  margin-right: 10px;
  cursor: pointer;
  background: ${ColorsSystem['Alien Blood']};
  color: ${ColorsSystem.White};
  padding: 20px;
  border-radius: 3px;
`;

export const TryItButton = ({ text }) => <ATile onClick={() => auth.authorize()}>{text}</ATile>;

import * as React from 'react';
import { rhythm } from '../utils/typography';
import styled from '@emotion/styled';

const ATile = styled.a`
  box-shadow: none;
  display: inline-flex;
`;

const Badge = styled.img`
  margin: 0px;
  height: ${rhythm(3 / 4)};
  box-shadow: none;
`;

export const TwitterFollow = ({ name }) => (
  <ATile href={`https://twitter.com/intent/follow?screen_name=${name}`}>
    <Badge
      alt="Twitter Shield"
      src={`https://img.shields.io/twitter/follow/${name}.svg?label=Follow ${name}&style=social`}
    />
  </ATile>
);

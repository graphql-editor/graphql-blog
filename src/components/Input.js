import * as React from 'react';
import { rhythm } from '../utils/typography';
import styled from '@emotion/styled';

const InputComponent = styled.input`
  border: 0;
  border-bottom-width: 3px;
  border-bottom-color: #000;
  border-bottom-style: solid;
  background: transparent;
  margin: 0;
  padding: ${rhythm(0.25)} ${rhythm(0.25)};
`;

export const Input = ({ value, onChange, name, style = {} }) => (
  <InputComponent
    type="text"
    name={name}
    placeholder="leave your email"
    style={{
      ...style,
    }}
    value={value}
    onChange={onChange}
  />
);

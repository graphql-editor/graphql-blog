import * as React from 'react';
import styled from '@emotion/styled';

const ATile = styled.a`
  box-shadow: none;
  display: inline-flex;
  margin-right: 10px;
`;

const Badge = styled.img`
  margin: 0px;
  height: 30px;
  box-shadow: 'none';
`;

export const Twitter = ({ text, url }) => (
  <ATile href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`}>
    <Badge alt="Twitter Shield" src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social" />
  </ATile>
);

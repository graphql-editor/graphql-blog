import React from 'react';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';
import { TryGraphQlBtnTopButton } from './TryGraphQLTopButton';

const Wrapper = styled.div`
  width: 100%;
  background: #fff;
  padding: 15px 30px;
  border-bottom: 1px solid #0001;
`;
const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
`;

const LogoImg = styled.img`
  margin: 0;
  height: 36px;
  text-decoration: none;
  cursor: pointer;
`;

export const Nav = () => {
  return (
    <Wrapper>
      <Bar>
        <LogoImg
          alt="GraphQL Editor Logo"
          src={require('../assets/logo.png')}
          onClick={() => {
            navigate('/');
          }}
        />
        <TryGraphQlBtnTopButton href="https://graphqleditor.com" target="_blank">
          Try GraphQL Editor
        </TryGraphQlBtnTopButton>
      </Bar>
    </Wrapper>
  );
};

import * as React from 'react';
import { rhythm } from '../utils/typography';
import { ColorsSystem } from '../Colors';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';

const Wrapper = styled.div`
  width: 100%;
`;

const Bar = styled.div`
  flex-flow: column nowrap;
  align-items: center;
  align-content: center;
  display: flex;
  padding: ${rhythm(1.5)};
  padding-bottom: ${rhythm(0.5)};
`;

const BlogTitle = styled.h2`
  color: ${ColorsSystem.Ultrasonic};
  font-size: ${rhythm(3)};
  font-weight: 700;
  margin-bottom: 0;
  cursor: pointer;
`;

const Logo = styled.a`
  margin: auto;
  text-decoration: none;
  box-shadow: none;
  display: inline-block;
  margin-bottom: ${rhythm(1)};
`;

const LogoImg = styled.img`
  margin: 0;
  height: 50px;
  text-decoration: none;
`;

export class Nav extends React.Component {
  render() {
    return (
      <Wrapper>
        <Bar>
          <Logo href="https://graphqleditor.com" target="_blank">
            <LogoImg alt="GraphQL Editor Logo" src={require('../assets/logoText.png')} />
          </Logo>
          <BlogTitle
            onClick={() => {
              navigate('/');
            }}
          >
            Blog
          </BlogTitle>
        </Bar>
      </Wrapper>
    );
  }
}

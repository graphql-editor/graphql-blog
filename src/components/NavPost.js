import * as React from 'react';
import { rhythm } from '../utils/typography';
import { ColorsSystem } from '../Colors';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';

const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items:center;
  height: 48px;
  width: 100%;
  background-color: #F7F8FA;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 777px) {
    justify-content: center;
  }
  @media screen and (min-width: 1440px) {
    height:56px;
  }
`;

const Bar = styled.div`
  padding:0;
  height:100%;
  width:100%;
  display: flex;
  justify-content: flex-end;
  align-items:center;
  width: 353px;
  @media(min-width:777px) {
  width: 624px;
  justify-content: space-between;
  }
  @media(min-width:1150px) {
    width: 1080px;
  }
`;


const BtnBack = styled.img`
  position: absolute;
  top:7px;
  left:0;
  height: 36px;
  cursor:pointer;
   @media screen and (min-width: 777px) {
      display:none;
    }
`;
const LogoImgText = styled.img`
  margin: 0;
  height: 36px;
  text-decoration: none;
  cursor:pointer;
  display: none;
  @media screen and (min-width: 777px) {
    display:block;
  }
`;

const TryGraphQlBtn = styled.div`
  font-size:${rhythm(0.55)};
  background-color:${ColorsSystem.Ultrasonic};
  color: white;
  padding:5px 10px;
  border-radius: 4px;
  cursor:pointer;
  @media screen and(min-width: 1440px) {
     padding:5px 14px;
  }
`;

export class Nav extends React.Component {
  render() {
    return (
      <Wrapper>
        <Bar>
          <BtnBack alt="GraphQL Editor Arrow to homepage" src={require('../assets/arrow-back.png')} onClick={() => { navigate('/');}} />
          <LogoImgText alt="GraphQL Editor Logo" src={require('../assets/logoText.png')} onClick={() => { navigate('/');}} />
          <a href="https://graphqleditor.com" target="_blank"><TryGraphQlBtn>Try GraphQL Editor</TryGraphQlBtn></a>
        </Bar>
      </Wrapper>
    );
  }
}

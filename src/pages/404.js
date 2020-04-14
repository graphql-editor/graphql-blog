import React from 'react'
import styled from '@emotion/styled';
import { navigate } from 'gatsby';
import { ColorsSystem } from '../Colors';

import { Nav } from '../components/NavPost';

const Bg = styled.div`
  height:100vh;
  background-color:${ColorsSystem.Black}11;
`
const Wrapper = styled.div`
  height: 80vh;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  text-align:center;
`
const BtnBack = styled.img `
  position: absolute;
  top: 82px;
  left:0;
  margin: 0;
  height: 36px;
  cursor:pointer;
  @media(max-width:777px){
    display:none;
  }
`;

const Error = styled.h1`
  font-size:18vh;
  font-weight:lighter;
`

const NotFoundPage = () => (
  <Bg>
    <Nav/>
    <Wrapper>
      <BtnBack alt="GraphQL Editor Arrow to homepage" src={require('../assets/arrow-back.png')} onClick={() => { navigate('/');}} />
      <Error>404</Error>
      <h2>Ooops!!</h2>
      <p>THAT PAGE DOESN&#39;T EXIST OR IS UNAVAILABLE.</p>
    </Wrapper>
  </Bg>
)

export default NotFoundPage

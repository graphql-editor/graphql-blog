import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { rhythm } from '../utils/typography';
import { Gql } from '../graphql-zeus';
import { useWindowSize } from '../utils/windowSize';

const activeTheme = 1;

const theme = [
  {
    color: '#25222E;',
    btnColor: '#4A45B9;',
    bgColor: '#DFE6F7;',
    mailBox: require('../assets/MailboxTransparent.png'),
    mbTop: '7%',
    mbRight: '45px',
    mbHeight: '93%',
  },
  {
    color: '#FFFFFF;',
    btnColor: '#25222E;',
    bgColor: 'linear-gradient(215.95deg, #0091FF -21.75%, #3E1E9F 100%);',
    mailBox: require('../assets/Mailbox.png'),
    mbTop: '0',
    mbRight: '0',
    mbHeight: '100%',
  },
  {
    color: '#FFFFFF;',
    btnColor: '#25222E;',
    bgColor: '#008BF5;',
    mailBox: require('../assets/Mailbox.png'),
    mbTop: '0',
    mbRight: '0',
    mbHeight: '100%',
  },
  {
    color: '#FFFFFF;',
    btnColor: '#4A45B9;',
    bgColor: '#061241;',
    mailBox: require('../assets/Mailbox.png'),
    mbTop: '0',
    mbRight: '0',
    mbHeight: '100%',
  },
];

const Wrapper = styled.div`
  position: relative;
  margin: 0 14px ${rhythm(1)};
  padding: 32px 16px;
  border-radius: 10px;
  background: ${(props) => props.version};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 251px;
  width: 100%;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
  @media (min-width: 777px) {
    margin: 32px auto ${rhythm(1)};
    height: 146px;
    max-width: 715px;
    flex-direction: row;
    align-items: center;
    padding-right: 24px;
  }
  @media (min-width: 1150px) {
    max-width: 1085px;
    padding-right: 289px;
  }
`;

const TextBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  text-align: center;
  @media (min-width: 777px) {
    padding-top: 20px;
    padding-left: 70px;
    text-align: left;
  }
  @media (min-width: 1150px) {
    margin-right: 10px;
    padding-left: 30px;
    min-width: 250px;
  }
`;
const H4 = styled.h4`
  margin-bottom: 0;
  color: ${(props) => props.version};
  font-size: ${rhythm(0.9)};
  @media (min-width: 777px) {
    font-size: ${rhythm(1.1)};
  }
`;
const Disc = styled.p`
  margin-top: 2px;
  font-size: ${rhythm(0.6)};
  color: ${(props) => props.version};
  @media (min-width: 777px) {
    font-size: ${rhythm(0.5)};
  }
`;

const Bolder = styled.span`
  font-weight: bold;
`;

const StyledForm = styled.div`
  margin: 0;
  width: 100%;
  @media (min-width: 777px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 1150px) {
    flex-direction: row;
  }
`;

const EmailInput = styled.input`
  width: 100%;
  font-size: ${rhythm(0.6)};
  padding: 9px 13px;
  border-radius: 4px;
  border: none;
  @media (min-width: 777px) {
    width: 311px;
  }
  @media (min-width: 1150px) {
    width: 330px;
    margin-right: 10px;
  }
`;

const SubBtn = styled.div`
  margin-top: 8px;
  text-align: center;
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  background-color: ${(props) => props.version};
  opacity: 0.9;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  @media (min-width: 777px) {
    width: 313px;
  }
  @media (min-width: 1150px) {
    margin-top: 0;
    width: 148px;
    font-weight: 500;
  }
`;

const MailBox = styled.img`
  display: none;
  @media (min-width: 1150px) {
    display: block;
    position: absolute;
    top: ${(props) => props.top};
    right: ${(props) => props.right};
    height: ${(props) => props.height};
  }
`;

const ThankYou = styled.div`
  position: relative;
  margin: 0 14px ${rhythm(1)};
  border-radius: 10px;
  background: ${(props) => props.version};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 251px;
  width: 100%;
  @media (min-width: 777px) {
    margin: 32px auto ${rhythm(1)};
    height: 146px;
    max-width: 715px;
  }
  @media (min-width: 1150px) {
    max-width: 1085px;
  }
`;

export const SubscribeBanner = () => {
  const [state, setState] = useState({
    value: '',
    subscribed: false,
  });

  useEffect(() => {
    const isUserSubscribed = window.localStorage.getItem('subscribed');
    if (isUserSubscribed) {
      setState({
        subscribed: true,
      });
    }
  }, []);
  const { width } = useWindowSize();
  if (state.subscribed) {
    return (
      <ThankYou version={theme[activeTheme].bgColor}>
        <H4 version={theme[activeTheme].color}>Thank you for subscribing!</H4>
      </ThankYou>
    );
  } // Wrap the require in check for window

  return (
    <Wrapper version={theme[activeTheme].bgColor}>
      <TextBox>
        <H4 version={theme[activeTheme].color}>
          {width <= 777 && 'Choose success!'}
          {width > 776 && 'Feed your brain!'}
        </H4>
        {width <= 776 && (
          <Disc version={theme[activeTheme].color}>
            Learn how <Bolder>GraphQL</Bolder> can boost your efficiency
          </Disc>
        )}
        {width > 776 && <Disc version={theme[activeTheme].color}>Be the first to know all about Graph QL.</Disc>}
      </TextBox>
      <StyledForm>
        <EmailInput
          placeholder="Your Email Address"
          name="EMAIL"
          value={state.value}
          onChange={(e) => {
            setState({
              ...state,
              value: e.target.value,
            });
          }}
        />
        <SubBtn
          version={theme[activeTheme].btnColor}
          onClick={() => {
            if (state.value.match('@')) {
              Gql.query({
                sendgrid: {
                  addMember: [
                    {
                      memberEmail: state.value,
                    },
                    true,
                  ],
                },
              }).then((response) => {
                if (response.sendgrid && response.sendgrid.addMember) {
                  if (window) {
                    window.localStorage.setItem('subscribed', 'subscribed');
                  }

                  setState({ ...state, subscribed: true });
                }
              });
            }
          }}
        >
          SUBSCRIBE
        </SubBtn>
      </StyledForm>
      {width > 776 && (
        <MailBox
          height={theme[activeTheme].mbHeight}
          right={theme[activeTheme].mbRight}
          top={theme[activeTheme].mbTop}
          src={theme[activeTheme].mailBox}
          alt="Mailbox icon"
        />
      )}
    </Wrapper>
  );
};

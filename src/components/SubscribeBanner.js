import * as React from 'react';
import styled from '@emotion/styled';
import { rhythm } from '../utils/typography';

const activeTheme = 1;

const theme = [
  {
    color: '#25222E;',
    btnColor: '#4A45B9;',
    bgColor: '#DFE6F7;',
    mailBox: require('../assets/MailboxTransparent.png'),
    mbTop: "7%",
    mbRight: '45px',
    mbHeight: '93%',
  },
  {
    color: '#FFFFFF;',
    btnColor: '#25222E;',
    bgColor: 'linear-gradient(215.95deg, #0091FF -21.75%, #3E1E9F 100%);',
    mailBox: require('../assets/Mailbox.png'),
    mbTop: "0",
    mbRight: '0',
    mbHeight: '100%',
  },
  {
    color: '#FFFFFF;',
    btnColor: '#25222E;',
    bgColor: '#008BF5;',
    mailBox: require('../assets/Mailbox.png'),
    mbTop: "0",
    mbRight: '0',
    mbHeight: '100%',
  },
  {
    color: '#FFFFFF;',
    btnColor: '#4A45B9;',
    bgColor: '#061241;',
    mailBox: require('../assets/Mailbox.png'),
    mbTop: "0",
    mbRight: '0',
    mbHeight: '100%',
  },
];



const Wrapper = styled.div `
    position:relative;
    margin: 0 14px ${rhythm(1)};
    padding: 32px 16px;
    border-radius: 10px;
    background: ${props => props.version};
    display:flex;
    flex-direction:column;
    justify-content:center;
    height: 251px;
    width: 100%;
    max-width: 340px;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
    @media(min-width:777px){
        margin:32px auto ${rhythm(1)};
        height: 146px;
        max-width:715px;
        flex-direction:row;
        align-items:center;
        padding-right: 24px;
    }
    @media(min-width:1150px){
        max-width:1085px;
        padding-right: 289px;
    }
`;

const TextBox = styled.div`
  height:100%;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:left;
  justify-content:center;
  text-align:center;
    @media(min-width:777px){
      padding-top:20px;
      padding-left:70px;
      text-align:left;
    }
    @media(min-width:1150px){
        margin-right:10px;
        padding-left:30px;
        min-width:250px;
      }
`
const H4 = styled.h4`
    margin-bottom:0;
    color: ${props => props.version};
    font-size:${rhythm(0.9)};
    @media(min-width: 777px){
      font-size:${rhythm(1.1)};
    }
`
const Disc = styled.p`
    margin-top:2px;
    font-size:${rhythm(0.6)};
    color: ${props => props.version};
    @media(min-width: 777px){
      font-size:${rhythm(0.5)};
    }
`;

const Bolder = styled.span`
    font-weight:bold;
`;

const StyledForm = styled.form `
  margin: 0;
  width:100%;
  @media(min-width: 777px){
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  @media(min-width:1150px){
    flex-direction:row;
  }
`;

const EmailInput = styled.input `
    width:100%;
    font-size:${rhythm(0.6)};
    padding:9px 13px;
    border-radius: 4px;
    border:none;
    @media(min-width: 777px){
      width: 311px;
    }
    @media(min-width:1150px){
      width: 330px;
      margin-right:10px
    }
`;

const SubBtn = styled.div`
    margin-top:8px;
    text-align:center;
    color:white;
    padding:10px 15px;
    border-radius: 4px;
    background-color: ${props => props.version};
    opacity: 0.9;
    &:hover{
      opacity: 1;
      cursor:pointer;
    }
    @media(min-width: 777px){
      width: 313px;
    }
    @media(min-width:1150px){
      margin-top:0;
      width: 148px;
      font-weight: 500;
    }
`;

const MailBox = styled.img`
  display:none;
  @media(min-width:1150px){
    display: block;
    position: absolute;
    top: ${props => props.top};
    right: ${props => props.right};
    height: ${props => props.height};
  }
`

const ThankYou = styled.div `
  position:relative;
    margin: 0 14px ${rhythm(1)};
    border-radius: 10px;
    background: ${props => props.version};
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    height: 251px;
    width: 100%;
    max-width: 340px;
    @media(min-width:777px){
      margin:32px auto ${rhythm(1)};
      height: 146px;
      max-width:715px;
    }
    @media(min-width:1150px){
      max-width:1085px;
    }
`;

export class SubscribeBanner extends React.Component {
  state = {
    value: '',
    subscribed: false,
  };

  componentDidMount() {
    const isUserSubscribed = window.localStorage.getItem('subscribed');
    if (isUserSubscribed) {
      this.setState({
        subscribed: true,
      });
    }
  }

  render(){
    window.onresize = function (event) {
      document.location.reload(true);
    }

     if (this.state.subscribed) {
      return (
        <ThankYou version={theme[activeTheme].bgColor}><H4 version={theme[activeTheme].color}>Thank you for subscribing!</H4></ThankYou>
      );
    }

    return (

      <Wrapper version={theme[activeTheme].bgColor}>
        <TextBox>
          <H4 version={theme[activeTheme].color}>
            {
              window.innerWidth < 777 &&
              'Choose succes!'
            }
            {
              window.innerWidth > 776 &&
              'Feed your brain!'
            }
          </H4>
          {
            window.innerWidth < 776 &&
            <Disc version={theme[activeTheme].color}>Get to know how <Bolder>GraphQl</Bolder> can boost your efficiency</Disc>
          }
          {
            window.innerWidth > 776 &&
            <Disc version={theme[activeTheme].color}>Be the first to know all about Graph QL.</Disc>
          }
        </TextBox>
        <StyledForm
          ref={
          (ref) => {
            if (ref) {
              this.form = ref;
            }
          }
        }
          action="https://online.us18.list-manage.com/subscribe/post?u=cff73d572350c30e7c497c973&amp;id=3adcea78e1"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
        >
          <EmailInput
            placeholder="email@somemail.com"
            name="EMAIL"
            value={this.state.value}
            onChange={(e) => {
              this.setState({
                value: e.target.value,
              });
            }}/>
          <SubBtn
            version={theme[activeTheme].btnColor}
            onClick={() =>{
              if (this.state.value.match('@')) {
                window.localStorage.setItem('subscribed', 'subscribed');
                this.setState({ subscribed: true });
                this.form.submit();
              }
          }}
          > Keep Informed
          </SubBtn>
        </StyledForm>
        {
            window.innerWidth > 776 &&
            <MailBox height={theme[activeTheme].mbHeight} right={theme[activeTheme].mbRight} top={theme[activeTheme].mbTop} src={theme[activeTheme].mailBox} alt="Mailbox icon" />
        }
      </Wrapper>
    );
  }
}
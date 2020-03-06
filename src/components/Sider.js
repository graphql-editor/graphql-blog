import * as React from 'react';
import { Twitter } from './Twitter';
import { rhythm } from '../utils/typography';
import styled from '@emotion/styled';

const SiderComponent = styled.div`
  position: fixed;
  left: 0;
  padding: 30px;
  top: 0;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  transition: 0.5s opacity;

  @media (max-width: ${rhythm(33)}) {
    opacity: 0 !important;
    pointer-events: none;
  }
`;

export class Sider extends React.Component {
  state = {
    showSider: false,
  };

  componentDidMount() {
    this.eventScroll = document.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop > 500 && !this.state.showSider) {
        this.setState({
          showSider: true,
        });
      } else if (this.state.showSider && document.documentElement.scrollTop <= 500) {
        this.setState({
          showSider: false,
        });
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.eventScroll);
  }

  render() {
    return (
      <SiderComponent
        style={{
          opacity: this.state.showSider ? 1 : 0,
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 'bold',
              marginTop: 25,
              textTransform: 'uppercase',
              marginBottom: 5,
            }}
          >
            Share this
          </div>
          <div
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
            }}
          >
            <Twitter text={this.props.Twitter.title} url={this.props.Twitter.url} />
          </div>
        </div>
      </SiderComponent>
    );
  }
}

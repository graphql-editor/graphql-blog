import * as React from 'react'
import { SubscribeButton } from './SubscribeButton'
import { Twitter } from './Twitter'
import { style, media } from 'typestyle'
import { rhythm } from '../utils/typography'
const SiderStyle = style(
  {
    position: 'fixed',
    left: 0,
    padding: 30,
    top: 0,
    height: '100vh',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    transition: '.5s opacity',
  },
  media(
    { maxWidth: rhythm(33) },
    {
      opacity: '0 !important',
      pointerEvents: 'none',
    }
  )
)
export class Sider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSider: false,
    }
  }
  componentDidMount() {
    this.eventScroll = document.addEventListener('scroll', e => {

      if (document.documentElement.scrollTop > 500 && !this.state.showSider) {
        this.setState({
          showSider: true,
        })
      } else if (
        this.state.showSider &&
        document.documentElement.scrollTop <= 500
      ) {
        this.setState({
          showSider: false,
        })
      }
    })
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.eventScroll)
  }
  render() {
    return (
      <div
        className="Sider"
        style={{
          opacity: this.state.showSider ? 1 : 0,
        }}
        className={SiderStyle}
      >
        <SubscribeButton />
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
            <Twitter
              text={this.props.Twitter.title}
              url={this.props.Twitter.url}
            />
          </div>
        </div>
      </div>
    )
  }
}

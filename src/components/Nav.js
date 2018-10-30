import * as React from 'react'
import { Github } from './Github'
import { rhythm } from '../utils/typography'
import { Twitter } from './Twitter'
import { UpButton } from './UpButton'
import { HorizontalSpacer } from './HorizontalSpacer'
import { Subscribe } from './Subscribe'

let subscribing = false

export class Nav extends React.Component {
  render() {
    const {
      Twitter: { text, url },
    } = this.props
    return (
      <div
        style={{
          width: '100%',
          background: '#fcfcfc',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: `${rhythm(0.5)} ${rhythm(3 / 4)}`,
            maxWidth: rhythm(24),
          }}
        >
          <div
            style={{
              display: 'flex',
              flexFlow: 'column nowrap',
            }}
          >
            <a
              href={'https://graphqleditor.com'}
              style={{
                textDecoration: 'none',
                boxShadow: 'none',
                display: 'inline-flex',
              }}
            >
              <img
                alt="GraphQL Editor Logo"
                src={require('../assets/logo_small.png')}
                style={{
                  margin: 0,
                  height: 20,
                  width: 186,
                  textDecoration: 'none',
                }}
              />
            </a>
            <div
              style={{
                fontSize: rhythm(0.4),
                letterSpacing: rhythm(0.01),
              }}
            >
              best backend creation tool
            </div>
          </div>
          {subscribing ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 'auto',
              }}
            >
              <Subscribe
                onSubscribe={e => {
                  setTimeout(4000, () => {
                    subscribing = false
                    this.forceUpdate()
                  })
                }}
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 'auto',
              }}
            >
              <UpButton
                onClick={() => {
                  subscribing = true
                  this.forceUpdate()
                }}
              >
                Subscribe
              </UpButton>
              <HorizontalSpacer v={10} />
              <UpButton href={'https://demo.graphqleditor.com/'}>
                Try demo
              </UpButton>
            </div>
          )}
        </div>
      </div>
    )
  }
}

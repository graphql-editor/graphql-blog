import * as React from 'react'
import { Github } from './Github'
import { rhythm } from '../utils/typography'
import { Twitter } from './Twitter'
export const Nav = ({ Twitter: { text, url } }) => (
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
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Twitter text={text} url={url} />
        <Github />
      </div>
      <a
        href={'https://graphqleditor.com'}
        style={{
          textDecoration: 'none',
          boxShadow: 'none',
          display: 'inline-flex',
        }}
      >
        <img
          src={require('../assets/logo_small.png')}
          style={{
            margin: 0,
            height: 20,
            width: 186,
            textDecoration: 'none',
          }}
        />
      </a>
    </div>
  </div>
)

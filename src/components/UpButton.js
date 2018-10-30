import * as React from 'react'
import { rhythm } from '../utils/typography'

export const UpButton = ({ children, onClick, href = '#' }) => (
  <a
    onClick={onClick}
    style={{
      padding: `${rhythm(0.25)} ${rhythm(0.5)}`,
      fontSize: rhythm(0.5),
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#000',
      fontWeight: 900,
      textTransform: 'uppercase',
      boxShadow: 'none',
      background: 'transparent',
      display: 'inline-flex',
      color: '#000',
      cursor: 'pointer',
    }}
    href={href}
  >
    {children}
  </a>
)

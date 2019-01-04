import React from 'react'

import { rhythm } from '../utils/typography'

export class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(0.25)} ${rhythm(3 / 4)} ${rhythm(1.5)}`,
        }}
      >
        {children}
      </div>
    )
  }
}


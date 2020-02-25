import React from 'react'

import { rhythm } from '../utils/typography'
import { style } from 'typestyle'
import { ColorsSystem } from '../Colors'

export class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div
        className={style({
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(48),
          padding: `${rhythm(0.25)} ${rhythm(3 / 4)} ${rhythm(1.5)}`,
        })}
      >
        {children}
      </div>
    )
  }
}

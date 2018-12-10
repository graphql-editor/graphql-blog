import * as React from 'react'
import { rhythm } from '../utils/typography';
export const TwitterFollow = ({ name }) => (
  <a
    style={{
      boxShadow: 'none',
      display: 'inline-flex',
    }}
    href={`https://twitter.com/intent/follow?screen_name=${name}`}
  >
    <img
      alt="Twitter Shield"
      src={`https://img.shields.io/twitter/follow/${name}.svg?label=Follow ${name}&style=social`}
      style={{ margin: 0, height: rhythm(3/4), boxShadow: 'none' }}
    />
  </a>
)

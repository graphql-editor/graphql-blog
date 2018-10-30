import * as React from 'react'
import { rhythm } from '../utils/typography'

export const Input = ({ value, onChange, name, style = {} }) => (
  <input
    type="text"
    name={name}
    placeholder="leave your email"
    style={{
      border: 0,
      borderBottomWidth: 3,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
      background: 'transparent',
      margin: 0,
      padding: `${rhythm(0.25)} ${rhythm(0.25)}`,
      ...style,
    }}
    onChange={onChange}
    value={value}
  />
)

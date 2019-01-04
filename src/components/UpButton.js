import * as React from 'react'
import { rhythm } from '../utils/typography'
import { style } from 'typestyle'
import { Colors } from '../Colors';

const UpButtonStyle = style({
  padding: `${rhythm(0.25)} ${rhythm(0.5)}`,
  fontSize: rhythm(0.5),
  fontWeight: 500,
  boxShadow: 'none',
  background: 'transparent',
  textDecoration:'none',
  color: Colors.lightText,
  cursor: 'pointer',
  $nest:{
    "&:hover":{
      color:Colors.main
    }
  }
})

export const UpButton = ({ children, onClick, href = '#' }) => (
  <a onClick={onClick} className={UpButtonStyle} href={href}>
    {children}
  </a>
)

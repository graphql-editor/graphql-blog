import * as React from 'react'
import { rhythm } from '../utils/typography'
import { UpButton } from './UpButton'
import { HorizontalSpacer } from './HorizontalSpacer'
import { style, media } from 'typestyle'
import { Colors, ColorsSystem } from '../Colors'
import { Link } from 'gatsby'

const Wrapper = style({
  width: '100%',
})

const Bar = style({
  flexFlow: 'column nowrap',
  alignItems: 'center',
  alignContent: 'center',
  display: 'flex',
  padding: rhythm(1.5),
  paddingBottom: rhythm(0.5),
})

const BlogTitle = style({
  color: ColorsSystem['Ultrasonic'],
  fontSize: rhythm(3),
  fontWeight: 700,
  marginBottom: 0,
})

const Logo = style({
  margin: 'auto',
  textDecoration: 'none',
  boxShadow: 'none',
  display: 'inline-block',
  marginBottom: rhythm(1),
})

const LogoImg = style({
  margin: 0,
  height: 50,
  textDecoration: 'none',
})

export class Nav extends React.Component {
  render() {
    return (
      <div className={Wrapper}>
        <div className={Bar}>
          <a
            href={'https://graphqleditor.com'}
            target="_blank"
            className={Logo}
          >
            <img
              alt="GraphQL Editor Logo"
              src={require('../assets/logoText.png')}
              className={LogoImg}
            />
          </a>
          <h2 className={BlogTitle}>Blog</h2>
        </div>
      </div>
    )
  }
}

import * as React from 'react'
import { rhythm } from '../utils/typography'
import { UpButton } from './UpButton'
import { HorizontalSpacer } from './HorizontalSpacer'
import { style, media } from 'typestyle'
import { Colors } from '../Colors'
import { Link } from 'gatsby'

const Wrapper = style({
  width: '100%',
})

const Bar = style(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)} ${rhythm(1.5)}`,
    maxWidth: rhythm(24),
  },
  media(
    { maxWidth: 480 },
    { flexFlow: 'column nowrap', alignItems: 'center', alignContent: 'center' }
  )
)
export class Nav extends React.Component {
  render() {
    return (
      <div className={Wrapper}>
        <div className={Bar}>
          <a
            href={'https://graphqleditor.com'}
            target="_blank"
            style={{
              textDecoration: 'none',
              boxShadow: 'none',
              display: 'inline-flex',
            }}
          >
            <img
              alt="GraphQL Editor Logo"
              src={require('../assets/logoText.png')}
              style={{
                margin: 0,
                height: 50,
                textDecoration: 'none',
              }}
            />
          </a>
        </div>
      </div>
    )
  }
}

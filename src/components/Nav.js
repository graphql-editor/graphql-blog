import * as React from 'react'
import { rhythm } from '../utils/typography'
import { UpButton } from './UpButton'
import { HorizontalSpacer } from './HorizontalSpacer'
import { style, media } from 'typestyle'
import { Colors } from '../Colors'
import { Link } from 'gatsby'

const Wrapper = style({
  width: '100%',
  background: Colors.bars,
})

const Bar = style(
  {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: `${rhythm(0.5)} ${rhythm(3 / 4)}`,
    maxWidth: rhythm(24),
  },
  media(
    { maxWidth: 480 },
    { flexFlow: 'column nowrap', alignItems: 'center', alignContent: 'center' }
  )
)

const NavMenu = style(
  {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  media({ maxWidth: 480 }, { flexFlow: 'column nowrap', marginLeft: 0,marginTop:15 })
)

export class Nav extends React.Component {
  render() {
    return (
      <div className={Wrapper}>
        <div className={Bar}>
          <div
            style={{
              display: 'flex',
              flexFlow: 'column nowrap',
            }}
          >
            <Link
              to={'/'}
              style={{
                textDecoration: 'none',
                boxShadow: 'none',
                display: 'inline-flex',
              }}
            >
              <img
                alt="GraphQL Editor Logo"
                src={require('../assets/logo.png')}
                style={{
                  margin: 0,
                  height: 40,
                  textDecoration: 'none',
                }}
              />
            </Link>
          </div>
          <div className={NavMenu}>
            <HorizontalSpacer v={10} />
            <UpButton href={'https://graphqleditor.com/services'}>
              Services
            </UpButton>
            <UpButton href={'https://graphqleditor.com/#roadmap'}>
              Roadmap
            </UpButton>
            <UpButton href={'https://docs.graphqleditor.com/'}>Docs</UpButton>
            <UpButton href={'https://graphqleditor.com/'}>Editor</UpButton>
          </div>
        </div>
      </div>
    )
  }
}

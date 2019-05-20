import Typography from 'typography'
import Theme from 'typography-theme-noriega'
import { ColorsSystem } from '../Colors'

Theme.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  a: {
    color: ColorsSystem['Super Nova'],
    boxShadow: 'none',
    textDecoration: 'none',
  },
})

const typography = new Typography(Theme)
// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

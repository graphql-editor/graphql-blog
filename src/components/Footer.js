import * as React from 'react'
import { style, media } from 'typestyle'
import { Layout } from '../components/layout'
import { footerData } from './text_data'
import { FooterWidget } from './FooterWidget'
import { Colors } from '../Colors'

const Main = style({
  paddingTop: 91,
  backgroundColor: Colors.bars, //colors.footerBackground
  width: '100%',
  background: '#aaa',
})

const Widgets = style(
  {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 20,
  },
  media(
    { maxWidth: 640 },
    {
      gridTemplateColumns: '1fr',
    }
  )
)

const Copyright = style({
  width: '100%',
  display: 'inline-block',
  padding: '31px 0 35px',
  $nest: {
    p: {
      fontSize: 14,
      color: Colors.lightText,
      letterSpacing: '1px',
      textAlign: 'left',

      '@media screen and (max-width: 576px)': {
        textAlign: 'center',
      },
    },
  },
})

export class Footer extends React.Component {
  render() {
    return (
      <footer className={Main}>
        <Layout>
          <div className={Widgets}>
            {footerData.map((el, i) => (
              <FooterWidget
                key={i}
                title={el.title}
                links={el.links}
                linksTo={el.linksTo}
              />
            ))}
          </div>
          <div className={Copyright}>
            <p>&copy; Copyright 2018 Graphqleditor.com</p>
          </div>
        </Layout>
      </footer>
    )
  }
}

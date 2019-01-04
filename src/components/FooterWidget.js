import * as React from 'react'
import { style } from 'typestyle'
import { Colors } from '../Colors'
const Main = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  $nest: {
    h4: {
      fontSize: 16,
      color: Colors.mainText,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: 28,
    },

    p: {
      color: Colors.lightText,
      marginBottom: 25,
      letterSpacing: '1px',
    },

    ul: {
      listStyle: 'none',

      $nest: {
        li: {
          marginBottom: 14,

          $nest: {
            a: {
              fontSize: 14,
              color: Colors.lightText,
              letterSpacing: '1px',
            },
          },
        },
      },
    },
  },
})
export const FooterWidget = ({ title, links, linksTo }) => (
  <div className={Main}>
    <h4>{title}</h4>
    <ul>
      {links.map((el, i) => (
        <li key={i}>
          <a href={linksTo[i]}>{el}</a>
        </li>
      ))}
    </ul>
  </div>
)

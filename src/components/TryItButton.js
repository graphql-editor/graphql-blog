import * as React from 'react'
import { auth } from '../utils/auth'
import { ColorsSystem } from '../Colors'
export const TryItButton = ({ text }) => (
  <a
    style={{
      boxShadow: 'none',
      display: 'inline-flex',
      marginRight: 10,
      cursor: 'pointer',
      background: ColorsSystem['Alien Blood'],
      color: ColorsSystem['White'],
      padding: 20,
      borderRadius: 3,
    }}
    onClick={() => auth.authorize()}
  >
    {text}
  </a>
)

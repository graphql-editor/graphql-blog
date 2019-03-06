import React from 'react'
import get from 'lodash/get'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { rhythm } from '../utils/typography'
import { Authors } from './authors'
import { Follow } from './Github'
import { TwitterFollow } from './TwitterFollow'
class Bio extends React.Component {
  render() {
    const author = get(this, 'props.author', 'Artur')
    const authorObject = Authors[author]
    const email = get(authorObject, 'email', 'hello@slothking.online')
    const github = get(authorObject, 'github')
    const twitter = get(authorObject, 'twitter')
    const name = get(
      authorObject,
      'name',
      'GraphQL and code generation passionate'
    )
    const desc = get(
      authorObject,
      'desc',
      'GraphQL and code generation passionate'
    )
    const photo = get(authorObject, 'photo', require('./profile-pic.jpg'))
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
          alignItems: 'center',
        }}
      >
        <img
          src={photo}
          alt={name}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: rhythm(1),
          }}
        />
        <div>
          Written by <strong>{name}</strong>
          {` ${desc} `} email me:
          <a href={`mailto:${email}`}>{email}</a>
          {github && <Follow name={github} />}
          {twitter && <TwitterFollow name={twitter} />}
        </div>
      </div>
    )
  }
}

export default Bio

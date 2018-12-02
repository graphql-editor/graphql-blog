import * as React from 'react'
import { Colors } from '../Colors'
import { rhythm } from '../utils/typography'
import { Link } from 'gatsby'
import { Authors } from './authors'

export const ArticleTile = ({
  slug,
  title,
  excerpt,
  author,
  date,
  readingTime,
}) => (
  <div key={slug}>
    <h3
      style={{
        marginBottom: rhythm(1 / 4),
      }}
    >
      <Link style={{ boxShadow: 'none', color: Colors.main }} to={slug}>
        {title}
      </Link>
    </h3>
    <p dangerouslySetInnerHTML={{ __html: excerpt }} />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src={Authors[author].photo}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 10,
          marginBottom: 0,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            color: Colors.orange,
            fontSize: rhythm(1 / 2),
          }}
        >
          {Authors[author].name}
        </div>
        <small
          style={{ color: Colors.lightText }}
        >{`${date} - ${readingTime} minutes read`}</small>
      </div>
    </div>
  </div>
)

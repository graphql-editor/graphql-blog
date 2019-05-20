import * as React from 'react'
import { Colors, ColorsSystem } from '../Colors'
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
  <div
    style={{
      marginBottom: rhythm(2.0),
    }}
    key={slug}
  >
    <h3
      style={{
        marginBottom: rhythm(1 / 4),
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          color: ColorsSystem['Infinito'],
          textDecoration: 'none',
        }}
        to={slug}
      >
        {title}
      </Link>
    </h3>
    <p
      dangerouslySetInnerHTML={{ __html: excerpt }}
      style={{ marginBottom: rhythm(1 / 2) }}
    />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        alt={`${Authors[author].name}`}
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
            color: ColorsSystem['Lead'],
            fontSize: rhythm(1 / 2),
          }}
        >
          {Authors[author].name}
        </div>
        <small
          style={{ color: ColorsSystem['Space Pirate'] }}
        >{`${date} - ${readingTime} minutes read`}</small>
      </div>
    </div>
  </div>
)

import * as React from 'react'
import { Colors, ColorsSystem } from '../Colors'
import { rhythm } from '../utils/typography'
import { Link, navigate } from 'gatsby'
import { Authors } from './authors'
import { style } from 'typestyle'

export const ArticleTile = ({
  slug,
  title,
  excerpt,
  author,
  date,
  readingTime,
  image,
}) => (
  <div
    className={style({
      margin: rhythm(0.5),
      width: 320,
      background: `${ColorsSystem.White}`,
      borderRadius: 10,
      display: 'flex',
      flexFlow: 'column',
      cursor: 'pointer',
      border: `1px solid transparent`,
      transition: `0.25s all`,
      $nest: {
        '&:hover': {
          border: `1px solid ${ColorsSystem['Ultrasonic']}`,
        },
      },
    })}
    onClick={() => navigate(slug)}
    key={slug}
  >
    <img
      className={style({
        width: `100%`,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 0,
      })}
      src={image ? image : require('../assets/placeholder.png')}
    />
    <h3
      style={{
        padding: rhythm(1),
        marginBottom: rhythm(1 / 4),
        paddingBottom: 0,
      }}
    >
      <Link
        style={{
          boxShadow: 'none',
          color: ColorsSystem['Black'],
          textDecoration: 'none',
        }}
        to={slug}
      >
        {title}
      </Link>
    </h3>
    <small
      className={style({
        color: ColorsSystem['Space Pirate'],
        padding: `0px ${rhythm(1)}`,
      })}
    >{`${readingTime} minutes read`}</small>
    <p
      dangerouslySetInnerHTML={{ __html: excerpt }}
      className={style({ marginBottom: rhythm(1 / 2), padding: rhythm(1) })}
    />
    <div
      className={style({
        display: 'flex',
        alignItems: 'center',
        padding: rhythm(1),
        marginTop: 'auto',
      })}
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
        <small className={style({ color: ColorsSystem['Space Pirate'] })}>
          {date}
        </small>
      </div>
    </div>
  </div>
)

import * as React from 'react'
export const Twitter = ({ text, url }) => (
  <a
    style={{
      boxShadow: 'none',
      display: 'inline-flex',
      marginRight: 10,
    }}
    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${url}`}
  >
    <img
      src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"
      style={{ margin: 0, height: 30, boxShadow: 'none' }}
    />
  </a>
)

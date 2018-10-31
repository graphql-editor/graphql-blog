import * as React from 'react'
export const Github = () => (
  <iframe
    src="https://ghbtns.com/github-btn.html?user=slothking-online&repo=graphql-blog&type=star&count=true&size=large"
    frameborder="0"
    scrolling="0"
    width="160px"
    height="30px"
    style={{
      margin: 0,
    }}
  />
)
export const Follow = ({ name }) => (
  <iframe
    src={`https://ghbtns.com/github-btn.html?user=${name}&type=follow&count=true`}
    frameborder="0"
    scrolling="0"
    width="170px"
    height="20px"
    style={{margin:0}}
  />
)

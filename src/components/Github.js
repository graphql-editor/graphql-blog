import * as React from 'react'
export const Github = () => (
  <iframe
    src="https://ghbtns.com/github-btn.html?user=slothking-online&repo=graphql-blog&type=star&count=true&size=large"
    frameBorder="0"
    scrolling="0"
    width="160px"
    height="30px"
    title="githubStars"
    style={{
      margin: 0,
    }}
  />
)
export const Follow = ({ name }) => (
  <iframe
    title="githubFollow"
    src={`https://ghbtns.com/github-btn.html?user=${name}&type=follow&count=true`}
    frameBorder="0"
    scrolling="0"
    width="170px"
    height="20px"
    style={{ margin: 0 }}
  />
)

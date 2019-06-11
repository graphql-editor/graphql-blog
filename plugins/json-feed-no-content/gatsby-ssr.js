const React = require('react')
const { defaultOptions } = require('./internals')

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const { json } = {
    ...defaultOptions,
    ...pluginOptions,
  }
  let output = []
  output.push(
    <link
      rel="alternate"
      key="gatsby-feed-nocontent-json"
      type="application/json"
      href="feed-nocontent.json"
    />
  )

  setHeadComponents(output)
}

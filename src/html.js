import React from 'react'
// Import typefaces
import '@openfonts/fira-sans_latin'
export default props => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div key="body" dangerouslySetInnerHTML={{ __html: props.body }} id="___gatsby" />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

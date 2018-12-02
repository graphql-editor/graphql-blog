import * as React from 'react'
import Helmet from 'react-helmet'
export const Seo = ({
  title,
  description,
  url,
  lang = 'en',
  image = require('../assets/graphql-header.jpg'),
  twitter = '@GraphQLEditor',
}) => (
  <Helmet
    htmlAttributes={{
      lang,
      prefix: 'og: http://ogp.me/ns#',
    }}
    link={[{ rel: 'canonical', href: url }]}
  >
    <title>{title}</title>
    <meta name="description" content={description} />

    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary" />
    {image && <meta name="twitter:image" content={image} />}
    <meta name="twitter:description" content={description} />
    <meta name="twitter:creator" content={twitter} />
  </Helmet>
)

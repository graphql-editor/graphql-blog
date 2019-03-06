import * as React from 'react'
import Helmet from 'react-helmet'
export const Seo = ({
  title,
  description,
  url,
  lang = 'en',
  image,
  absouluteImage,
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
    <link rel="canonical" href={url} />
    <link rel="amphtml" href={url} />
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow, " />
    <meta name="keywords" content="graphql, editor, blog, tutorial, rest, react"/>
    <meta property="og:site_name" content={`GraphQL Editor`} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />

    <meta name="twitter:title" content={title} />
    <meta name="twitter:site" content={"@GraphQLEditor"} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={absouluteImage} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:creator" content={twitter} />
    
  </Helmet>
)

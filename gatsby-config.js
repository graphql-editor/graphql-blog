module.exports = {
  siteMetadata: {
    title: 'GraphQL Blog: Learning GraphQL, Tutorials, Examples, Tools',
    author: 'Artur Czemiel',
    description:
      'Learn everything about GraphQL. How it works, how it looks comparing GraphQL vs REST? What are the issues with GraphQL performance? You will find out everything from our GraphQL tutorials and examples.',
    siteUrl: 'https://blog.graphqleditor.com',
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-127595045-1`,
      },
    },
    `gatsby-plugin-feed`,
    `json-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GraphQL Editor Blog`,
        short_name: `GraphQL Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/logo.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-html2amp',
      options: {
        files: ['**/*.html'],
        dist: 'public/amp',
      },
    },
  ],
}

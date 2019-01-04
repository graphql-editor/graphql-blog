const fs = require('fs')
const pify = require('pify')

module.exports = {
  writeFile: pify(fs.writeFile),
  runQuery: (handler, query) =>
    handler(query).then(r => {
      if (r.errors) {
        throw new Error(r.errors.join(`, `))
      }
      return r.data
    }),
  defaultOptions: {
    generator: `GatsbyJS`,
    rss: true,
    json: true,
    siteQuery: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                author
              }
            }
          }
        `,

    feedQuery: `
            {
              allMarkdownRemark(
                sort: {order: DESC, fields: [frontmatter___date]}, 
                limit: 100, 
                
                ) {
                edges {
                  node {
                    html
                    fields{
                      slug
                    }
                    frontmatter {
                      date
                      title
                    }
                  }
                }
              }
            }
            `,
  },
}

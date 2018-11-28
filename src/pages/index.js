import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import { Nav } from '../components/Nav'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const canonicalUrl = get(this, 'props.location.href')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    return (
      <React.Fragment>
        <Nav
          Twitter={{
            text:
              'Check out this Graph QL Blog. Read about GraphQL ReactXP and other new technologies!',
            url: 'https://blog.graphqleditor.com/',
          }}
        />
        <Layout location={this.props.location}>
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            link={[{ rel: 'canonical', href: canonicalUrl }]}
            meta={[
              { name: 'description', content: siteDescription },
              {
                name: 'google-site-verification',
                content: '49EjfDNUeTSlHmKmXSV7vCpWiIEQMOYy8dm1yvNvw2o',
              },
            ]}
            title={siteTitle}
          />
          {posts.filter(p=> p.node.frontmatter.title[0] !== '_').map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            )
          })}
        </Layout>
      </React.Fragment>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            author
          }
        }
      }
    }
  }
`

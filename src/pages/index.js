import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import { Nav } from '../components/Nav'
import { Seo } from '../components/Seo'
import { Authors } from '../components/authors'
import { Colors } from '../Colors'
import { ArticleTile } from '../components/ArticleTile'
class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const canonicalUrl = get(this, 'props.location.href')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    console.log(this.props)
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
          <Seo
            title={siteTitle}
            description={siteDescription}
            url={canonicalUrl}
          />
          <Helmet
            meta={[
              {
                name: 'google-site-verification',
                content: '49EjfDNUeTSlHmKmXSV7vCpWiIEQMOYy8dm1yvNvw2o',
              },
            ]}
          />
          {posts
            .filter(p => p.node.frontmatter.title[0] !== '_')
            .map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug
              return (
                <ArticleTile
                  slug={node.fields.slug}
                  author={node.frontmatter.author}
                  date={node.frontmatter.date}
                  readingTime={node.fields.readingTime}
                  excerpt={node.excerpt}
                  title={title}
                  key={node.fields.slug}
                />
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
            readingTime
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            author
            image {
              name
            }
          }
        }
      }
    }
  }
`

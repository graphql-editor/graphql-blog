import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import { Layout } from '../components/layout'
import { Nav } from '../components/Nav'
import { Seo } from '../components/Seo'
import { ArticleTile } from '../components/ArticleTile'

import { style } from 'typestyle'
import { Colors } from '../Colors'
import { rhythm } from '../utils/typography'
import { Footer } from '../components/Footer'

const Pagination = {
  div: style({
    padding: `20px 0`,
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
  }),
  link: style({
    color: Colors.main,
    fontWeight: 'lighter',
    fontSize: rhythm(1.0),
    textDecoration: 'none',
    boxShadow: 'none',
    letterSpacing: 2,
  }),
}

class BlogIndex extends React.Component {
  componentDidMount() {
    this.onScroll = window.addEventListener('scroll', e => {
      const scrollValue =
        (document.documentElement.scrollTop + window.innerHeight) /
        document.documentElement.scrollHeight
      if (scrollValue && !this.loading) {
        this.loading = true
      }
    })
  }
  render() {
    const { index, group, last, first, group: posts } = get(
      this,
      'props.pathContext'
    )
    const previousUrl = index - 1 === 1 ? '' : (index - 1).toString()
    const nextUrl = (index + 1).toString()
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const canonicalUrl = get(this, 'props.location.href')
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
          <h1>Everything about GraphQL.</h1>
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
          <div className={Pagination.div}>
            {!first && (
              <Link className={Pagination.link} to={previousUrl}>
                ← previous
              </Link>
            )}
            {!last && (
              <Link className={Pagination.link} to={nextUrl}>
                next →
              </Link>
            )}
          </div>
        </Layout>
        <Footer />
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
      skip: 0
    ) {
      pageInfo {
        hasNextPage
      }
      totalCount
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

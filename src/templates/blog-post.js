import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/Bio'
import { Layout } from '../components/layout'
import { rhythm, scale } from '../utils/typography'
import { Nav } from '../components/Nav'
import { DiscussionEmbed, CommentCount } from 'disqus-react'
import { Sider } from '../components/Sider'
import { Seo } from '../components/Seo'
import { style } from 'typestyle'

const BackToBlog = style({
  padding: `20px 0`,
  boxShadow: 'none',
  position: 'absolute',
})

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const cannonicalUrl = get(this.props, 'location.href')
    const { previous, next } = this.props.pageContext
    return (
      <React.Fragment>
        <Sider
          Twitter={{
            url: cannonicalUrl,
            title: post.frontmatter.title,
          }}
        />
        <Nav
          Twitter={{
            text: post.frontmatter.title,
            url: this.props.location.href,
          }}
        />
        <Layout location={this.props.location}>
          <Seo
            title={`${post.frontmatter.title} | ${siteTitle}`}
            description={siteDescription}
            url={cannonicalUrl}
            image={
              post.frontmatter.image
                ? `${this.props.location.origin}${
                    post.frontmatter.image.publicURL
                  }`
                : `${
                    this.props.location.origin
                  }${require('../assets/graphql-header.jpg')}`
            }
          />
          <Link to={'/'} className={BackToBlog}>
            ← Back to blog
          </Link>
          <h1>{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: 'block',
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {post.frontmatter.date}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <h2>Hey, have a minute? </h2>
          <p>
            Do you want to try our mock backend from GraphQL app. It is in beta
            phase and 100% free.
          </p>
          <div
            style={{
              textAlign: 'right',
              marginBottom: rhythm(1),
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'end',
              justifyContent: 'center',
              padding: rhythm(1),
            }}
          >
            <a href="https://app.graphqleditor.com">Try visual editor app</a>
          </div>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio author={post.frontmatter.author} />
          <Link
            style={{
              position: 'relative',
              marginBottom: 15,
            }}
            to={'/'}
            className={BackToBlog}
          >
            ← Back to blog
          </Link>
          <DiscussionEmbed
            shortname="blog-graphqleditor-com"
            config={{
              url: cannonicalUrl,
              identifier: post.frontmatter.title + post.frontmatter.date,
              title: post.frontmatter.title,
            }}
          />
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </Layout>
      </React.Fragment>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        image {
          publicURL
        }
      }
    }
  }
`

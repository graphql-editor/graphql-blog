import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'
import { Nav } from '../components/Nav'
import { Twitter } from '../components/Twitter'
import { DiscussionEmbed, CommentCount } from 'disqus-react'
import { SubscribeButton } from '../components/SubscribeButton'
import { Sider } from '../components/Sider'

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
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            link={[{ rel: 'canonical', href: cannonicalUrl }]}
            meta={[{ name: 'description', content: siteDescription }]}
            title={`${post.frontmatter.title} | ${siteTitle}`}
          />
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
            Do you want to hear latest news from backend and frontend
            automation. We never bug you; we just send you our latest piece of
            content.
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
            <SubscribeButton />
          </div>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio author={post.frontmatter.author} />
          <DiscussionEmbed
            shortname="blog-graphqleditor-com"
            config={{
              url: this.props.location.href,
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
      }
    }
  }
`

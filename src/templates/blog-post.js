import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/Bio'
import { Layout } from '../components/layout'
import { rhythm, scale } from '../utils/typography'
import { Nav } from '../components/Nav'
import { DiscussionEmbed } from 'disqus-react'
import { Sider } from '../components/Sider'
import { Seo } from '../components/Seo'
import { Footer } from '../components/Footer'
import { ColorsSystem } from '../Colors'
import { style } from 'typestyle'

const BackButton = style({
  marginRight: rhythm(1.0),
  color: ColorsSystem['Ashes'],
  ...scale(-1 / 2),
})

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const cannonicalUrl = `https://blog.graphqleditor.com${post.fields.slug}`
    const ampUrl = `https://blog.graphqleditor.com/amp/${post.fields.slug}`
    const fakeOrigin = 'http://blog.graphqleditor.com'
    const { previous, next } = this.props.pageContext
    console.log(post)
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
            ampUrl={ampUrl}
            url={cannonicalUrl}
            image={
              post.frontmatter.image
                ? `${post.frontmatter.image.publicURL}`
                : `${require('../assets/graphql-header.jpg')}`
            }
            absouluteImage={
              post.frontmatter.image
                ? `${fakeOrigin}${post.frontmatter.image.publicURL}`
                : `${fakeOrigin}${require('../assets/graphql-header.jpg')}`
            }
          />
          <h1 style={{ textAlign: 'center', marginBottom: rhythm(1 / 2) }}>
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: 'block',
              textAlign: 'center',
              color: ColorsSystem['Space Pirate'],
              marginBottom: rhythm(0),
            }}
          >
            {`${post.frontmatter.date} by ${post.frontmatter.author}`}
          </p>
          <div style={{ textAlign: 'center', marginBottom: rhythm(1.0) }}>
            <Link to={'/'} className={BackButton}>
              ← back to blog
            </Link>
          </div>
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
            <a href="https://graphqleditor.com">Try visual editor app</a>
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
                <Link
                  to={previous.fields.slug}
                  rel="prev"
                  style={{ marginRight: 'auto', color: ColorsSystem.Triton }}
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  to={next.fields.slug}
                  rel="next"
                  style={{ marginLeft: 'auto' }}
                >
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </Layout>
        <Footer />
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
      fields {
        slug
      }
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

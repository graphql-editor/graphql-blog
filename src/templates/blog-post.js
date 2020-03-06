import React from 'react';
import { graphql } from 'gatsby';
import { BlogPostBaseTemplate } from './base/blog-post';

class BlogPostTemplate extends React.Component {
  render() {
    return <BlogPostBaseTemplate {...this.props} />;
  }
}

export default BlogPostTemplate;

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
`;

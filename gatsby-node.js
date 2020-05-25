const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const readingTime = require('reading-time');
const createPaginatedPages = require('./plugins/pagination');
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
              pageInfo {
                hasNextPage
              }
              totalCount
              edges {
                node {
                  excerpt
                  rawMarkdownBody
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
                      childImageSharp {
                        fluid(maxWidth: 720) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;
          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          });
        });

        createPaginatedPages({
          edges: result.data.allMarkdownRemark.edges,
          createPage,
          pageTemplate: 'src/templates/main.js',
          pageLength: 25, // This is optional and defaults to 10 if not used
        });
      }),
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
    createNodeField({
      name: `readingTime`,
      node,
      value: Math.ceil(readingTime(node.rawMarkdownBody).minutes) * 2,
    });
  }
};

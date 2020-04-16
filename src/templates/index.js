import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import { Layout } from '../components/layout';
import { Nav } from '../components/Nav';
import { SubscribeBanner } from '../components/SubscribeBanner';
import { Seo } from '../components/Seo';
import { ArticleTile } from '../components/ArticleTile';

import { ColorsSystem } from '../Colors';
import { scale } from '../utils/typography';
import { Footer } from '../components/Footer';
import styled from '@emotion/styled';
import { css } from 'emotion';

const PaginationDiv = styled.div`
  padding: 20px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
`;

const Background = styled.div`
  background: ${ColorsSystem.Black}11;
`;

const H1 = styled.h1`
  margin: 38px auto;
  text-align: center;
  @media (min-width: 777px) {
    display: none;
  }
`;

const PostsGrid = styled.div`
  margin: 0px;
  padding-top: 0px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const scaled = scale(1 / 2);

const PaginationLink = css`
  color: ${ColorsSystem.Triton};
  font-weight: lighter;
  text-decoration: none;
  box-shadow: none;
  letter-spacing: 2px;
  font-size: ${scaled.fontSize};
  line-height: ${scaled.lineHeight};
`;

class BlogIndex extends React.Component {
  componentDidMount() {
    this.onScroll = window.addEventListener('scroll', () => {
      const scrollValue =
        (document.documentElement.scrollTop + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollValue && !this.loading) {
        this.loading = true;
      }
    });
  }

  render() {
    const { index, last, first, group: posts } = get(this, 'props.pathContext');
    const previousUrl = index - 1 === 1 ? '' : (index - 1).toString();
    const nextUrl = (index + 1).toString();
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteDescription = get(this, 'props.data.site.siteMetadata.description');
    const canonicalUrl = get(this, 'props.location.href');
    return (
      <Background>
        <Nav
          Twitter={{
            text: 'Check out this Graph QL Blog. Read about GraphQL ReactXP and other new technologies!',
            url: 'https://blog.graphqleditor.com/',
          }}
        />
        <Layout location={this.props.location}>
          <Seo title={siteTitle} description={siteDescription} url={canonicalUrl} />
          <Helmet
            meta={[
              {
                name: 'google-site-verification',
                content: '49EjfDNUeTSlHmKmXSV7vCpWiIEQMOYy8dm1yvNvw2o',
              },
            ]}
          />
          <H1>GraphQL Blog</H1>
          {window.innerWidth > 776 && <SubscribeBanner />}
          <PostsGrid>
            {posts
              .filter((p) => p.node.frontmatter.title[0] !== '_')
              .splice(0, 1)
              .map(({ node }) => {
                const title = get(node, 'frontmatter.title') || node.fields.slug;
                return (
                  <ArticleTile
                    key={node.fields.slug}
                    slug={node.fields.slug}
                    author={node.frontmatter.author}
                    date={node.frontmatter.date}
                    readingTime={node.fields.readingTime}
                    excerpt={node.excerpt}
                    title={title}
                    image={
                      node.frontmatter.image &&
                      node.frontmatter.image.childImageSharp &&
                      node.frontmatter.image.childImageSharp.fluid.src
                    }
                  />
                );
              })}
            {window.innerWidth < 776 && <SubscribeBanner />}
            {posts
              .filter((p) => p.node.frontmatter.title[0] !== '_')
              .splice(1, 999)
              .map(({ node }) => {
                const title = get(node, 'frontmatter.title') || node.fields.slug;
                return (
                  <ArticleTile
                    key={node.fields.slug}
                    slug={node.fields.slug}
                    author={node.frontmatter.author}
                    date={node.frontmatter.date}
                    readingTime={node.fields.readingTime}
                    excerpt={node.excerpt}
                    title={title}
                    image={
                      node.frontmatter.image &&
                      node.frontmatter.image.childImageSharp &&
                      node.frontmatter.image.childImageSharp.fluid.src
                    }
                  />
                );
              })}
          </PostsGrid>
          <PaginationDiv>
            {!first && (
              <Link className={PaginationLink} to={previousUrl} style={{ marginRight: 'auto' }}>
                ← previous
              </Link>
            )}
            {!last && (
              <Link className={PaginationLink} to={nextUrl} style={{ marginLeft: 'auto' }}>
                next →
              </Link>
            )}
          </PaginationDiv>
        </Layout>
        <Footer />
      </Background>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 10, skip: 0) {
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
`;

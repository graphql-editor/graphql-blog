import React from 'react';
import { Link } from 'gatsby';
import get from 'lodash/get';

import Bio from '../../components/Bio';
import { Layout } from '../../components/layout';
import { rhythm, scale } from '../../utils/typography';
import { Nav } from '../../components/Nav';
import { DiscussionEmbed } from 'disqus-react';
import { Sider } from '../../components/Sider';
import { Seo } from '../../components/Seo';
import { Footer } from '../../components/Footer';
import { ColorsSystem } from '../../Colors';
import { TryItButton } from '../../components/TryItButton';
import styled from '@emotion/styled';
import { css } from 'emotion';

const scaled = scale(-1 / 2);

const BackButton = css`
  margin-right: ${rhythm(1)};
  color: ${ColorsSystem.Ashes};
  font-size: ${scaled.fontSize};
  line-height: ${scaled.lineHeight};
`;

const Wrapper = styled.div`
  max-width: ${rhythm(24)};
  margin: auto;
`;

const DateFont = scale(-1 / 5);
const AuthorDate = styled.div`
  display: block;
  text-align: center;
  color: ${ColorsSystem['Space Pirate']};
  margin-bottom: 0px;
  font-size: ${DateFont.fontSize};
  line-height: ${DateFont.lineHeight};
`;

const PostTitle = styled.h1`
  text-align: center;
  margin-bottom: ${rhythm(1 / 2)};
`;

const PostBack = styled.div`
  text-align: center;
  margin-bottom: ${rhythm(1)};
`;

const TryItContainer = styled.div`
  text-align: right;
  margin-bottom: ${rhythm(1)};
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  justify-content: center;
  padding: ${rhythm(1)};
`;

const PostsNext = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const PreviousPost = css`
  margin-right: auto;
  color: ${ColorsSystem.Triton};
`;
const NextPost = css`
  margin-left: auto;
`;

const BackLink = css`
  position: relative;
  margin-bottom: 15px;
`;

const HorizontalLine = styled.hr`
  margin-bottom: ${rhythm(1)};
`;

const PromoVideo = styled.video`
  max-width: 100%;
  margin: auto;
  margin-bottom: 15px;
`;

export class BlogPostBaseTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteDescription = post.excerpt;
    const cannonicalUrl = `https://blog.graphqleditor.com${post.fields.slug}`;
    const fakeOrigin = 'http://blog.graphqleditor.com';
    const coverImage = post.frontmatter.image
      ? `${post.frontmatter.image.publicURL}`
      : `${require('../../assets/graphql-header.jpg')}`;
    const { previous, next } = this.props.pageContext;
    console.log(post);
    return (
      <>
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
          <Wrapper>
            <Seo
              title={`${post.frontmatter.title} | ${siteTitle}`}
              description={siteDescription}
              url={cannonicalUrl}
              image={coverImage}
              absouluteImage={
                post.frontmatter.image
                  ? `${fakeOrigin}${post.frontmatter.image.publicURL}`
                  : `${fakeOrigin}${require('../../assets/graphql-header.jpg')}`
              }
            />
            <PostTitle>{post.frontmatter.title}</PostTitle>
            <AuthorDate>{`${post.frontmatter.date} by ${post.frontmatter.author}`}</AuthorDate>
            <PostBack>
              <Link to="/" className={BackButton}>
                ← back to blog
              </Link>
            </PostBack>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <HorizontalLine />

            <h2>Speed up your GraphQL API development </h2>
            <p>
              The GraphQL Editor is a supportive tool for both advanced GraphQL users as well as those taking their
              first steps with GraphQL APIs. Our all-in-one development environment for GraphQL will help you build,
              manage & deploy your GraphQL API much faster thanks to dozens of built-in micro features. Its graphical
              interface will also fix communication within your product team. Visualization is the key!
            </p>

            <TryItContainer>
              <TryItButton text="Try it for free" />
            </TryItContainer>

            <PromoVideo loop autoPlay mute src={require('../../assets/pizza.mp4')} />

            <HorizontalLine />
            <Bio author={post.frontmatter.author} />
            <Link className={BackLink} to="/">
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
            <PostsNext>
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev" className={PreviousPost}>
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next" className={NextPost}>
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </PostsNext>
          </Wrapper>
        </Layout>
        <Footer />
      </>
    );
  }
}

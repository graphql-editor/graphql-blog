import React from 'react';
import { Link } from 'gatsby';
import get from 'lodash/get';

import Bio from '../../components/Bio';
import { rhythm, scale } from '../../utils/typography';
import { Nav } from '../../components/Nav';
import { Seo } from '../../components/Seo';
import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { ColorsSystem } from '../../Colors';
import { TryItButton } from '../../components/TryItButton';
import styled from '@emotion/styled';
import { css } from 'emotion';

const DateFont = scale(-1 / 5);
const AuthorDate = styled.div`
  margin-bottom: 30px;
  display: block;
  text-align: center;
  color: ${ColorsSystem['Space Pirate']};
  font-size: ${DateFont.fontSize};
  line-height: ${DateFont.lineHeight};
`;

const PostTitle = styled.h1`
  margin-top: 28px;
  text-align: center;
  margin-bottom: ${rhythm(1 / 2)};
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
  display: block;
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
    return (
      <>
        <Nav
          Twitter={{
            text: post.frontmatter.title,
            url: this.props.location.href,
          }}
        />
        <Container>
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
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <HorizontalLine />

          <h2>Speed up your GraphQL API development </h2>
          <p>
            The GraphQL Editor is a supportive tool for both advanced GraphQL users as well as those taking their first
            steps with GraphQL APIs. Our all-in-one development environment for GraphQL will help you build, manage &
            deploy your GraphQL API much faster thanks to dozens of built-in micro features. Its graphical interface
            will also fix communication within your product team. Visualization is the key!
          </p>

          <TryItContainer>
            <TryItButton text="Try it for free" />
          </TryItContainer>

          <PromoVideo loop autoPlay mute src={require('../../assets/pizza-2.mp4')} />

          <HorizontalLine />
          <Bio author={post.frontmatter.author} />
          <Link className={BackLink} to="/">
            ← Back to blog
          </Link>
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
        </Container>
        <Footer />
      </>
    );
  }
}

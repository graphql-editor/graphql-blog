import React from 'react';
import { ColorsSystem } from '../Colors';
import { rhythm } from '../utils/typography';
import { Link, navigate } from 'gatsby';
import { Authors } from './authors';

import styled from '@emotion/styled';
import { css } from 'emotion';

const TileMain = styled.div`
  margin: ${rhythm(0.5)};
  margin-top: 0;
  margin-bottom: ${rhythm(1)};
  width: 343px;
  background: ${ColorsSystem.White};
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  cursor: pointer;
  border: 1px solid transparent;
  transition: 0.25s border-color;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.1);
  &:hover {
    border: 1px solid ${ColorsSystem.Ultrasonic}55;
  }
  @media (max-width: 777px) {
    width: 100% !important;
  }
`;

const TileImg = styled.img`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 0;
`;

const ReadingTime = styled.small`
  color: ${ColorsSystem['Space Pirate']};
  padding: 0px ${rhythm(1)};
`;

const TileTitle = styled.h3`
  padding: ${rhythm(1)};
  margin-bottom: ${rhythm(1 / 4)};
  padding-bottom: 0px;
`;
const TileTitleLink = css`
  box-shadow: none;
  color: ${ColorsSystem.Black};
  text-decoration: none;
`;

const TilePostAuthor = styled.div`
  display: flex;
  align-items: center;
  padding: ${rhythm(1)};
  margin-top: auto;
`;

const TilePostAuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 0px;
`;
const TilePostAuthorName = styled.div`
  color: ${ColorsSystem.Lead};
  font-size: ${rhythm(1 / 2)};
`;
const TilePostAuthorDate = styled.small`
  color: ${ColorsSystem['Space Pirate']};
`;

const TilePostShortText = styled.p`
  margin-bottom: ${rhythm(1 / 2)};
  padding: ${rhythm(1)};
`;

export const ArticleTile = ({ slug, title, excerpt, author, date, readingTime, image, big }) => (
  <TileMain
    key={slug}
    style={{
      width: big ? 716 : 343,
    }}
    onClick={() => navigate(slug)}
  >
    <TileImg src={image ? image : require('../assets/placeholder.png')} />
    <TileTitle>
      <Link className={TileTitleLink} to={slug}>
        {title}
      </Link>
    </TileTitle>
    <ReadingTime>{`${readingTime} minutes read`}</ReadingTime>
    <TilePostShortText dangerouslySetInnerHTML={{ __html: excerpt }} />
    <TilePostAuthor>
      <TilePostAuthorAvatar alt={`${Authors[author].name}`} src={Authors[author].photo} />
      <div>
        <TilePostAuthorName>{Authors[author].name}</TilePostAuthorName>
        <TilePostAuthorDate>{date}</TilePostAuthorDate>
      </div>
    </TilePostAuthor>
  </TileMain>
);

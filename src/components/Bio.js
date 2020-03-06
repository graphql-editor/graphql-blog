import React from 'react';
import get from 'lodash/get';

import { rhythm } from '../utils/typography';
import { Authors } from './authors';
import { Follow } from './Github';
import { TwitterFollow } from './TwitterFollow';

import styled from '@emotion/styled';

const BioTile = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2.5)};
  align-items: center;
`;
const BioAvatar = styled.img`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  width: ${rhythm(2)};
  height: ${rhythm(2)};
  border-radius: ${rhythm(1)};
`;

class Bio extends React.Component {
  render() {
    const author = get(this, 'props.author', 'Artur');
    const authorObject = Authors[author];
    const email = get(authorObject, 'email', 'hello@slothking.online');
    const github = get(authorObject, 'github');
    const twitter = get(authorObject, 'twitter');
    const name = get(authorObject, 'name', 'GraphQL and code generation passionate');
    const desc = get(authorObject, 'desc', 'GraphQL and code generation passionate');
    const photo = get(authorObject, 'photo', require('./profile-pic.jpg'));
    return (
      <BioTile>
        <BioAvatar src={photo} alt={name} />
        <div>
          Written by <strong>{name}</strong>
          {` ${desc} `} email me:
          <a href={`mailto:${email}`}>{email}</a>
          {github && <Follow name={github} />}
          {twitter && <TwitterFollow name={twitter} />}
        </div>
      </BioTile>
    );
  }
}

export default Bio;

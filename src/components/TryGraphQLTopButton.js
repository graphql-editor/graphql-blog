import { ColorsSystem } from '../Colors';
import styled from '@emotion/styled';

export const TryGraphQlBtnTopButton = styled.a`
  display: block;
  background-color: ${ColorsSystem.Ultrasonic};
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  @media screen and(min-width: 1440px) {
    padding: 5px 14px;
  }
`;

import { ColorsSystem } from '../Colors';
import styled from '@emotion/styled';

export const TryGraphQlBtnTopButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${ColorsSystem.Ultrasonic};
  padding: 5px 10px;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s;
  background-color: ${ColorsSystem.White};
  @media screen and(min-width: 1440px) {
    padding: 5px 14px;
  }
  &:hover {
    color: ${ColorsSystem.White};
    background-color: ${ColorsSystem.Ultrasonic};
  }
`;

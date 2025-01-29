import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  color: ${({ theme }) => theme.colors.white};
  height: 100%;
  min-height: 100vh;
  display: flex;
  width: 100vw;
  display: grid;
  grid-template-columns: 11fr 5fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    'header controller'
    'actSection controller';
`;
export const Header = styled.div`
  grid-area: header;
`;
export const Controller = styled.div`
  grid-area: controller;
`;

export const ActSection = styled.div`
  grid-area: actSection;
`;

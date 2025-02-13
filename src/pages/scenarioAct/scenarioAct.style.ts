import styled from 'styled-components';

export const LoadingContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  color: ${({ theme }) => theme.colors.white};
  height: 100%;
  min-height: 100vh;
  display: flex;
  width: 100vw;
  display: grid;
  grid-template-columns: 11fr 5fr;
  grid-template-rows: 51.2px 1fr;
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

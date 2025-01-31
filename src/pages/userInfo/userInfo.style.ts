import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: calc(100vw - 300px);
  width: 100%;
  justify-self: center;
  height: 100vh;
  flex-direction: column;
  padding: 30px;
  max-width: 1200px;
  gap: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const Title = styled.div`
  height: 29px;
  top: 80px;
  left: 352px;
  gap: 0px;
  opacity: 0px;
  font-family: Pretendard;
  font-size: 19.2px;
  font-weight: 500;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Projects = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  @media (max-width: 847px) {
    flex-direction: column;
    align-items: center;
  }
`;

export { Container, Projects, Title };

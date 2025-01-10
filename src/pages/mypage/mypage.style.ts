import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-self: center;
  height: 100vh;
  flex-direction: column;
  padding: 30px;
  max-width: 1200px;
  gap: 20px;
  overflow-y: scroll;
`;
const Title = styled.div`
  width: 79px;
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
`;

export { Container, Projects, Title };

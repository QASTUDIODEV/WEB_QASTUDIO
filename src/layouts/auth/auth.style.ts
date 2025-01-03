import styled, { css } from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.pri_900};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const circleStyles = css`
  position: absolute;
  background: radial-gradient(50% 50% at 50% 50%, rgba(13, 64, 157, 0.5) 0%, rgba(0, 7, 20, 0) 100%);
  opacity: 0.5;
  border-radius: 99px 0px 0px 0px;
`;

const Circle1 = styled.div`
  ${circleStyles}
  width: 1489px;
  height: 1621px;
  top: -598px;
  left: 901px;
`;

const Circle2 = styled.div`
  ${circleStyles}
  width: 851px;
  height: 851px;
  top: 272px;
  left: -265px;
`;

const Circle3 = styled.div`
  ${circleStyles}
  width: 697px;
  height: 697px;
  top: -304px;
  left: 196px;
`;

const Circle4 = styled.div`
  ${circleStyles}
  width: 512px;
  height: 512px;
  top: 791px;
  left: 1467px;
`;

export { Circle1, Circle2, Circle3, Circle4, Container };

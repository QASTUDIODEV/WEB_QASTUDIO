import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 75px;
  height: 25px;
  overflow: hidden;

  border-radius: 80px;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  background: transparent;
`;

const Filler = styled.div<{ $percent: number }>`
  width: ${(props) => props.$percent}%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.point.point_2};
  border-radius: 80px;
`;

const PercentageText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: ${({ theme }) => theme.colors.primary.pri_50};
  ${({ theme }) => theme.text.medium_14};
  z-index: 1;
`;

export { Container, Filler, PercentageText };

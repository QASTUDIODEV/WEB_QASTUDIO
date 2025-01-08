import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  ${({ theme }) => theme.align.column_center};
  background: ${({ theme }) => theme.colors.primary.pri_900};
`;

export const Title = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 19.2px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 28.8px */
  letter-spacing: 0.384px;
  color: ${({ theme }) => theme.colors.primary.pri_50};
  margin-bottom: 0.5208333333%;
`;

export const Text = styled.div`
  text-align: center;
  font-family: Pretendard;
  font-size: 14.4px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21.6px */
  letter-spacing: 0.288px;
  color: ${({ theme }) => theme.colors.gray.gray_300};
  margin-bottom: 2.083333333%;
`;

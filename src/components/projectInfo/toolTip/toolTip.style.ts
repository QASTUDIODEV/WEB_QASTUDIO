import styled from 'styled-components';

export const Container = styled.div`
  min-width: 161px;
  min-height: 72px;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.primary.pri_700};
  background: ${({ theme }) => theme.colors.background.black};
`;
export const Text = styled.p`
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.24px;
  color: white;
`;

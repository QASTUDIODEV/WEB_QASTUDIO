import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 18px;
    height: 18px;
  }
  gap: 4px;
`;

const TrueMessage = styled.div`
  color: ${({ theme }) => theme.colors.success.success_500};
  font-size: 14px;
`;
const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error.error_400};
  font-size: 14px;
`;
export { Container, ErrorMessage, TrueMessage };

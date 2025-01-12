import styled from 'styled-components';

const Container = styled.div<{ $increase: boolean }>`
  border: 0.576px solid ${({ $increase }) => ($increase ? 'rgba(50, 207, 94, 0.2)' : 'rgba(245, 51, 51, 0.2)')};
  background: ${({ $increase }) => ($increase ? 'rgba(50, 207, 94, 0.2)' : 'rgba(245, 51, 51, 0.2)')};
  color: ${({ $increase, theme }) => ($increase ? theme.colors.success.success_500 : theme.colors.error.error_500)};

  ${({ theme }) => theme.align.row_center};
  ${({ theme }) => theme.text.medium_14};
  gap: 5px;
  padding: 0 3px;
  border-radius: 2px;
  height: 24px;
`;

export { Container };

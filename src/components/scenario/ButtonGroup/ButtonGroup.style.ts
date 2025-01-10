import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;

export const EditButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AllCheckBoxGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error.error_400};
  display: flex;
  align-items: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.28px;
`;

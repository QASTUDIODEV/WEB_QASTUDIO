import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
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
  gap: 6.4px;

  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error.error_400};
  display: flex;
  align-items: center;
  font-size: 11.2px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.28px;
  gap: 2px;
  text-align: center;
`;

export const IconContainer = styled.div`
  width: 19.2px;
  height: 19.2px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

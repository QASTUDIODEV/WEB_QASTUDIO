import styled from 'styled-components';

const State = styled.span<{ $isSuccess: boolean }>`
  ${({ theme }) => theme.text.medium_14};
  color: ${({ theme, $isSuccess }) => ($isSuccess ? theme.colors.success.success_500 : theme.colors.error.error_500)};
`;

const HeaderWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const ButtonHeader = styled.button`
  width: 100%;

  display: flex;
  gap: 5px;
  align-items: center;
  background: transparent;
  ${({ theme }) => theme.text.medium_14};
  color: ${({ theme }) => theme.colors.primary.pri_50};
`;

const Action = styled.button<{ $isSuccess: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme, $isSuccess }) => ($isSuccess ? theme.colors.success.success_700 : theme.colors.error.error_400)};
  border: none;
  background: none;
  cursor: pointer;
`;

export { Action, ButtonHeader, HeaderWrapper, State };

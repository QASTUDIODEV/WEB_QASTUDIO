import styled, { css } from 'styled-components';

const buttonTypes = {
  normal: css`
    padding: 12px 20px;
    ${({ theme }) => theme.text.medium_14};
    border-radius: 4px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.point.point_2};
    color: #ffffff;
    border: none;
    height: 41px;
  `,
  small: css`
    padding: 12px 20px;
    ${({ theme }) => theme.text.medium_14};
    border-radius: 4px;
    width: 79px;
    height: 41px;
    background-color: ${({ theme }) => theme.colors.point.point_2};
    color: #ffffff;
    border: none;
  `,
  code: css<{
    $valid?: boolean;
    $codeverify?: boolean;
  }>`
    padding: 12px 20px;
    ${({ theme }) => theme.text.medium_14};
    border-radius: 4px;
    width: 79px;
    height: 41px;
    border: none;
    background-color: ${({ $valid, $codeverify, theme }) => {
      if ($valid) {
        return $codeverify ? theme.colors.point.point_1 : theme.colors.point.point_2;
      }
      return theme.colors.gray.gray_500;
    }};
    color: #ffffff;
    cursor: ${({ $valid, $codeverify }) => ($valid && $codeverify ? 'not-allowed' : 'pointer')};
  `,
};

// 비활성화 상태 스타일
const disabledStyles = css`
  background-color: ${({ theme }) => theme.colors.gray.gray_500};
  color: ${({ theme }) => theme.colors.primary.pri_50};
  border: none;
  cursor: not-allowed;
`;

export const StyledButton = styled.button<{
  format: 'normal' | 'small' | 'code';
  disabled: boolean;
  $codeverify?: boolean;
  $valid?: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${({ format }) => buttonTypes[format]}
  ${({ disabled }) => disabled && disabledStyles}
`;

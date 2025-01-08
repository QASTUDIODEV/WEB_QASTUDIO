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
    valid?: boolean;
    codeVerify?: boolean;
  }>`
    padding: 12px 20px;
    ${({ theme }) => theme.text.medium_14};
    border-radius: 4px;
    width: 79px;
    height: 41px;
    border: none;
    background-color: ${({ valid, codeVerify }) => (valid ? (codeVerify ? '#007f7f' : '#0d409d') : '#a0a0a0')};
    color: ${({ valid }) => (valid ? 'white' : '#d3d3d3')};
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
  codeVerify?: boolean;
  valid?: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${({ format }) => buttonTypes[format]}
  ${({ disabled }) => disabled && disabledStyles}
`;

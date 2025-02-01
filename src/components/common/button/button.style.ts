import styled, { css } from 'styled-components';

const buttonTypes = {
  normal: css`
    padding: 8px 16px;
    font-family: Pretendard;
    font-size: 14.4px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21.6px */
    letter-spacing: 0.288px;
    border-radius: 8px;
  `,
  act: css`
    padding: 8px 16px;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
    letter-spacing: 0.32px;
    border-radius: 8px;
  `,
  small_round: css`
    padding: 1.6px 8px;
    font-family: Pretendard;
    font-size: 9.6px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 14.4px */
    letter-spacing: 0.192px;
    border-radius: 99px;
  `,
  small_square: css`
    padding: 4.8px 8px;
    font-family: Pretendard;
    font-size: 9.6px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 14.4px */
    letter-spacing: 0.192px;
    border-radius: 3.2px;
  `,
  tag: css`
    padding: 6.4px 9.6px;
    font-family: Inter;
    font-size: 14.4px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 99px;
  `,
};

// 버튼 색상 스타일
const buttonColors = {
  default: css`
    background-color: rgba(223, 232, 249, 0.1);
    color: ${({ theme }) => theme.colors.primary.pri_50};
    border: none;
  `,
  blue: css`
    background-color: ${({ theme }) => theme.colors.point.point_2};
    color: ${({ theme }) => theme.colors.primary.pri_50};
    border: none;
  `,
  gray: css`
    background-color: ${({ theme }) => theme.colors.gray.gray_500};
    color: ${({ theme }) => theme.colors.primary.pri_50};
    border: none;
  `,
  green: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.success.success_500};
    border: 0.5px solid ${({ theme }) => theme.colors.success.success_500};
  `,
  white_round: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary.pri_50};
    border: 0.5px solid ${({ theme }) => theme.colors.primary.pri_50};
  `,
  red: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.error.error_500};
    border: 0.5px solid ${({ theme }) => theme.colors.error.error_500};
  `,
  white_square: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary.pri_50};
    border: 1px solid ${({ theme }) => theme.colors.primary.pri_50};
  `,
  mint: css`
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.point.point_1};
    border: none;
  `,
  selected: css`
    color: ${({ theme }) => theme.colors.primary.pri_800};
    background-color: ${({ theme }) => theme.colors.primary.pri_50};
    border: none;
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
  type: 'normal' | 'act' | 'small_round' | 'small_square' | 'tag';
  color: 'default' | 'blue' | 'gray' | 'green' | 'white_round' | 'red' | 'white_square' | 'mint' | 'selected';
  disabled: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  ${({ type }) => buttonTypes[type]}
  ${({ color }) => buttonColors[color]}
  ${({ disabled }) => disabled && disabledStyles}
`;

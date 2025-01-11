import styled, { css } from 'styled-components';

type TLogoProps = {
  color: string;
  $isgithub?: string;
  size: 'small' | 'large';
  disable?: boolean;
};

type TLogosProp = {
  $gap: number;
  size: string;
};

const sizeType = {
  small: css`
    width: 25.6px;
    height: 25.6px;
  `,
  large: css`
    width: 56px;
    height: 56px;
  `,
};

const sizeLogoType = {
  small: css`
    width: 12px;
    height: 12px;
  `,
  large: css`
    width: 25px;
    height: 25px;
  `,
};

const Logos = styled.div<TLogosProp>`
  ${({ theme }) => theme.align.row_center};
  padding: 10px;
  gap: ${({ $gap }) => $gap}px;
  height: ${({ size }) => (size === 'large' ? '100px' : '30px')};
`;

const Logo = styled.button<TLogoProps>`
  background-color: ${(props) => props.color};
  ${({ theme }) => theme.align.row_center};
  ${({ size }) => sizeType[size]}
  border: none;
  border-radius: 99px;
  svg {
    ${({ size }) => sizeLogoType[size]}
    width: ${({ $isgithub, size }) => $isgithub === 'true' && (size === 'small' ? '18px' : '41px')};
    height: ${({ $isgithub, size }) => $isgithub === 'true' && (size === 'small' ? '18px' : '41px')};
  }
  &:disabled {
    cursor: default;
  }
`;

export { Logo, Logos };

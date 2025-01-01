import type { DefaultTheme } from 'styled-components';

const colors = {
  main: '#02112C', // color: ${({ theme }) => theme.colors.main};
  white: '#EFEFEF',
  black: '#000000',

  point: {
    point_1: '#008080',
    point_2: '#0D409D',
  },
  error: {
    error_50: '#FFF6F6',
    error_100: '#FFEAEA',
    error_200: '#FEC8C8',
    error_300: '#FB9090',
    error_400: '#F95A5A',
    error_500: '#F53333',
    error_600: '#D71313',
    error_700: '#AB1E1E',
    error_800: '#801717',
    error_900: '#4C0F0F',
  },
  success: {
    success_50: '#F4FFF7',
    success_100: '#E0FDE8',
    success_200: '#C0F3CE',
    success_300: '#94EAAD',
    success_400: '#5AD97F',
    success_500: '#32CF5E',
    success_600: '#2CAE58',
    success_700: '#2D8851',
    success_800: '#1B652D',
    success_900: '#094219',
  },
  warning: {
    warning_50: '#FFF8EE',
    warning_100: '#FFEDD0',
    warning_200: '#FFE1B3',
    warning_300: '#FFD695',
    warning_400: '#FFC05A',
    warning_500: '#FFA91F',
    warning_600: '#E3951B',
    warning_700: '#AB6D13',
    warning_800: '#72450B',
    warning_900: '#3A1D03',
  },
  info: {
    info_50: '#F8FBFF',
    info_100: '#EAF3FF',
    info_200: '#C0DEFD',
    info_300: '#97CAFA',
    info_400: '#6DB5F8',
    info_500: '#43A0F5',
    info_600: '#3580C9',
    info_700: '#27609D',
    info_800: '#183F70',
    info_900: '#0A1F44',
  },
  gray: {
    gray_50: '#EFEFEF',
    gray_100: '#DBDBDB',
    gray_200: '#BDBDBD',
    gray_300: '#999999',
    gray_400: '#858585',
    gray_500: '#666666',
    gray_600: '#5E5E5E',
    gray_700: '#424242',
    gray_800: '#333333',
    gray_900: '#121212',
  },
  background: {
    white: '#FAFAFA',
    black: '#16181C',
  },
};

const text = {
  // ${({ theme }) => theme.text.bold_28};
  bold_28: `
    font-size: 28px;
    font-weight: 700;
    line-height: 150%; 
    letter-spacing: 0.56px;
  `,
  bold_24: `
    font-size: 24px;
    font-weight: 700;
    line-height: 150%; 
    letter-spacing: 0.48px;
  `,
  medium_24: `
    font-size: 24px;
    font-weight: 500;
    line-height: 150%; 
    letter-spacing: 0.48px;
  `,
  medium_22: `
    font-size: 22px;
    font-weight: 500;
    line-height: 150%; 
    letter-spacing: 0.44px;
  `,
  medium_20: `
    font-size: 20px;
    font-weight: 500;
    line-height: 150%; 
    letter-spacing: 0.4px;
  `,
  medium_18: `
    font-size: 18px;
    font-weight: 500;
    line-height: 150%; 
    letter-spacing: 0.36px;
  `,
  medium_14: `
    font-size: 14px;
    font-weight: 500;
    line-height: 150%; 
    letter-spacing: 0.28px;
  `,
};

const shadow = {
  shadow_1: '0px 2px 4px 0px rgba(0, 0, 0, 0.20)', // box-shadow: ${({ theme }) => theme.shadow.shadow_1};
  shadow_2: '0px 1px 10px 0px rgba(0, 0, 0, 0.10)',
};

const align = {
  // ${({ theme }) => theme.align.row_center};
  row_center: `
    display: flex;
    justify-content: center;
    align-items: center;
   `,
  column_center: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  row_space_between: `
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  column_space_between: `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `,
};

export type TColorsType = typeof colors;
export type TTextType = typeof text;
export type TShadowType = typeof shadow;
export type TAlign = typeof align;

const theme: DefaultTheme = {
  colors,
  text,
  shadow,
  align,
};

export default theme;

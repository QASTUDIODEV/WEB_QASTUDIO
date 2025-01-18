/* eslint-disable @typescript-eslint/naming-convention */

import type { TAlign, TColorsType, TShadowType, TTextType } from '@/styles/theme.ts';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: TColorsType;
    text: TTextType;
    shadow: TShadowType;
    align: TAlign;
  }
}

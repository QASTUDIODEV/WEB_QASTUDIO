import type { CSSObject, Interpolation } from 'styled-components';
import { css } from 'styled-components';

type TDeviceType = 'desktop' | 'tablet' | 'phone';

const sizes: Record<TDeviceType, number> = {
  desktop: 1024,
  tablet: 768,
  phone: 600,
};

const media = Object.entries(sizes).reduce(
  (acc, [key, value]) => {
    return {
      ...acc,
      [key]: (first: TemplateStringsArray | CSSObject, ...interpolations: Interpolation<object>[]) => css`
        @media (max-width: ${value}px) {
          ${css(first, ...interpolations)}
        }
      `,
    };
  },
  {} as Record<TDeviceType, (first: TemplateStringsArray | CSSObject, ...interpolations: Interpolation<object>[]) => ReturnType<typeof css>>,
);

export { media };

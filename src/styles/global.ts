import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    ${normalize}
    @font-face {
        font-family: 'Pretendard';
        src: url('/fonts/PretendardVariable.woff2') format('woff2');
        font-display: swap;
        font-weight: 45 920;
    }

    * {
        font-family: 'Pretendard', sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
    }

    body {
        min-height: 100vh;
    }

    button {
        cursor: pointer;
        border: none;
    }
`;

export default GlobalStyle;

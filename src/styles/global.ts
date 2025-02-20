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
        overflow-x: hidden;
    }

    body {
        min-height: 100vh;
    }

    button {
        cursor: pointer;
        border: none;
    }

    li, ul {
        list-style: none none;
    }

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        border-radius: 6px;
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
    }
`;

export default GlobalStyle;

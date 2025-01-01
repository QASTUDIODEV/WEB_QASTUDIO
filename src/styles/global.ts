import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Pretendard';
        src: url('/fonts/PretendardVariable.woff2') format('woff2');
        font-display: swap;
        font-weight: 45 920;
    }

    * {
        font-family: 'Pretendard', sans-serif;
        margin: 0;
        box-sizing: border-box;
    }
    
    body {
        min-height: 100vh;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;

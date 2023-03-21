import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Poppins', sans-serif;
}

body {
    background: ${({ theme }) => theme.colors.body};
}

img {
    max-width: 100%;
}

`;

export default GlobalStyles;

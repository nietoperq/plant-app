import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
}

body {
    background: ${({ theme }) => theme.colors.body};
}

`;

export default GlobalStyles;

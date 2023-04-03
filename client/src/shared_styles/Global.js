import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Poppins', sans-serif;
}

body {
    color: ${({ theme }) => theme.colors.font};
}

h1, h2, h3{
    font-weight: 600;

}

h3 {
}

img {
    max-width: 100%;
}

`;

export default GlobalStyles;

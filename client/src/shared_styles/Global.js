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

h1, h2, h3, h4{
    font-weight: 600;

}

h3 {
}

img {
    max-width: 100%;
}

span.error-message {
    color: red;
    font-size: 14px;
    margin: 5px 0;

}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 5px;
}

@keyframes transitionIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

`;

export default GlobalStyles;

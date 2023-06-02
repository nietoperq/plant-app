import styled from "styled-components";

export const Auth = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background: #fff;
    border-radius: 20px;
    padding: 100px 0;
    width: 500px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    h1 {
        font-size: 2rem;
        color: ${({ theme }) => theme.colors.primary};
    }

    form input {
        border: none;
        background: #eee;
        border-radius: 50px;
        padding: 10px 20px;
        font-size: 16px;
    }

    form input:focus {
        outline: none;
    }

    button {
        border: none;
        color: #fff;
        background: ${({ theme }) => theme.colors.primary};
        border-radius: 50px;
        padding: 10px;
        width: 50%;
        font-size: 16px;
        cursor: pointer;
    }

    button:active {
        transform: scale(0.99);
    }

    .link {
        color: ${({ theme }) => theme.colors.primary};
    }

    .error-message {
        max-width: 400px;
        text-align: center;
        color: red;
    }

    @media (max-width: 600px) {
        width: 100%;
        height: 100%;
        text-align: center;
    }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

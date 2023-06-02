import styled from "styled-components";

export const Home = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

export const Navbar = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    background: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 0 5vw;
    z-index: 100;

    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 25px;
        font-weight: 700;
        margin-right: auto;
    }

    a {
        color: ${({ theme }) => theme.colors.font};
        text-decoration: none;
        cursor: pointer;
        margin: 0 20px;
        font-size: 18px;

        &:hover {
            font-weight: 500;
        }
    }

    @media (max-width: 1000px) {
        height: 80px;

        h1 {
            font-size: 20px;
        }

        a {
            margin: 0 10px;
            font-size: 16px;
        }
    }
`;

export const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100%;
    padding: 100px 10vw 0 10vw;
    gap: 50px;

    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 10px;
        height: auto;
        padding-bottom: 50px;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    width: 50%;

    h2 {
        font-size: 30px;
        color: ${({ theme }) => theme.colors.primary};
    }

    p {
        line-height: 35px;
    }

    a {
        display: flex;
        justify-content: center;
        background: ${({ theme }) => theme.colors.primary};
        color: #fff;
        width: fit-content;
        padding: 10px 50px;
        border-radius: 100px;
        text-decoration: none;

        &:active {
            transform: scale(0.99);
        }
    }

    @media (max-width: 1000px) {
        width: 100%;
        order: 2;
        align-items: center;
        text-align: center;

        h2 {
            font-size: 20px;
        }

        p {
            font-size: 14px;
            line-height: 25px;
        }
    }
`;

export const Animation = styled.div`
    width: 50%;
    @media (max-width: 1000px) {
        width: 100%;
        order: 1;
        canvas {
            width: 100%;
            height: 80vw;
        }
    }
`;

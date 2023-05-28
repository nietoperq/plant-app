import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 60px);
    margin: 30px;

    @media (max-width: 750px) {
        margin: 0px;
        height: 100vh;
    }
`;

export const Content = styled.div`
    padding: 20px;
    border-radius: 30px;
    background: #eee;
    overflow: auto;
    width: 100%;

    & > * {
        animation: transitionIn 1s;
    }

    h2 {
        font-weight: 500;
    }

    @media (max-width: 750px) {
        border-radius: 0px;
    }
`;

export const Section = styled.div`
    background: #ffffffdd;
    padding: 30px;
    border-radius: 30px;
    animation: transitionIn 1s;
    span {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const WrapSectionElements = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

export const Card = styled.div`
    position: relative;
    background: #fff;
    border-radius: 20px;
    margin: 10px;
    padding: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const ClickableSpan = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        font-weight: 500;
    }
`;

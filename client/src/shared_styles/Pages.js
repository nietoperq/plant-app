import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    left: 300px;
    right: 20px;
    top: 20px;
    bottom: 20px;
    padding: 20px;
    border-radius: 20px;
    background: #eee;
    overflow: auto;

    h2 {
        font-weight: 500;
    }
`;

export const Section = styled.div`
    background: #ffffffdd;
    padding: 20px;
    border-radius: 20px;

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

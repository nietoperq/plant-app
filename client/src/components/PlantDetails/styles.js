import styled from "styled-components";

export const PlantDetails = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 30px 50px;
    h1 {
        position: absolute;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.primary};
    }
    p {
        color: #333;
        font-size: 14px;
    }
`;

export const PlantModel = styled.div`
    width: 100%;
    height: 250px;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
    // outline: 1px solid grey;
`;

export const Button = styled.span`
    cursor: pointer;
    font-size: 14px;
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    background: #b0998f22;
`;

export const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-areas:
        "l h w w "
        "m t f f "
        "i i i i  ";
    gap: 20px;
`;

export const Cell = styled.div`
    display: inline-block;
    width: 100%;
    background: #b0998f22;
    border-radius: 10px;
    padding: 10px;
    h2 {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 16px;
        font-weight: 600;
    }
`;

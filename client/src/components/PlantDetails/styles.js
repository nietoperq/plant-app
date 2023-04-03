import styled from "styled-components";

export const PlantDetails = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 10px;
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

export const Button = styled.button`
    cursor: pointer;
    border: none;
    font-size: 14px;
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    background: #b0998f22;
`;

export const DeleteButton = styled.button`
    background: none;
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    padding: 0;
    font-size: 14px;
    cursor: pointer;
    transition: 0.1s linear;

    &:hover {
        color: crimson;
    }
`;

export const WaterButton = styled(Button)`
    color: #61b1d4;
    background: none;
    transition: transform 0.2s ease;

    svg {
        display: block;
        margin: auto;
        font-size: 30px;
        path {
            stroke-width: 1.5;
        }
    }
    &:hover {
        transform: translateY(-5px);
    }
`;

export const FertilizeButton = styled(Button)`
    color: #b2c182;
    background: none;
    transition: 0.2s ease;
    svg {
        display: block;
        margin: auto;
        font-size: 30px;
        path {
            stroke-width: 1.5;
        }
    }
    &:hover {
        transform: translateY(-5px);
    }
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
    background: #fff;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    padding: 10px;
    h2 {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 16px;
        font-weight: 600;
    }
`;

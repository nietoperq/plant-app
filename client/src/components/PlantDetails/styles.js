import styled from "styled-components";

export const PlantDetails = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    padding: 30px 50px;
    height: 80vh;
    h1 {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.primary};
    }
    h2 {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 16px;
        font-weight: 500;
    }
    p {
        color: #333;
        font-size: 14px;
    }

    @media (max-width: 1000px) {
        height: auto;
        padding: 20px;
        padding-bottom: 70px;
    }
`;

export const PlantModel = styled.div`
    width: 100%;
    height: 250px;
    margin: 10px 0 0 0;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
    // outline: 1px solid grey;
`;

export const Button = styled.button`
    cursor: pointer;
    display: inline-flex;
    gap: 5px;
    border: none;
    font-size: 14px;
    margin: 0 10px;
    padding: 5px 15px;
    border-radius: 100px;
    color: #fff;
    background: ${({ theme }) => theme.colors.primary};

    svg {
        font-size: 20px;
    }

    &:not(:disabled):hover {
        filter: brightness(110%);
    }

    &:disabled {
        background-color: #ccc;
        cursor: auto;
    }
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

export const Navigation = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    padding: 0 20px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.1s ease;

    &:hover {
        font-weight: 500;
    }

    &.active-section {
        border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    }
`;

export const Grid = styled.div`
    width: 100%;
    display: grid;
    gap: 20px;

    @media (max-width: 1000px) {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

export const Cell = styled.div`
    display: inline-block;
    width: 100%;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 20px;
    padding: 10px;

    p {
        display: flex;
        gap: 10px;
    }

    svg {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 20px;
    }

    select {
        border: none;
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: 20px;
        padding: 5px;
        margin: 5px 0;
        cursor: pointer;

        &:focus {
            outline: none;
        }
    }
`;

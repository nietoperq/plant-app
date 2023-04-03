import styled, { ThemeProvider } from "styled-components";

export const PlantCard = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    background: #fff;
    border-radius: 20px;
    margin: 100px 20px 20px 20px;
    padding: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
`;

export const PlantModel = styled.div`
    //outline: 1px solid grey;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 40px;
    width: 250px;
    height: 250px;
`;

export const PlantInfo = styled.div`
    left: 0;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    height: 100%;

    font-weight: 600;
`;

export const Icon = styled.div`
    position: relative;
    svg {
        color: ${(props) => props.color || props.theme.colors.primary};
        width: 20px;
        height: 20px;
    }
`;

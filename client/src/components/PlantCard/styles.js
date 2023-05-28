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
    animation: transitionIn 2s;

    @media (max-width: 1000px) {
        margin: 20px 20px 20px 20px;
    }
`;

export const PlantModel = styled.div`
    //outline: 1px solid grey;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 40px;
    width: 250px;
    height: 250px;
    animation: transitionIn 2s;

    @media (max-width: 1000px) {
        width: 180px;
        height: 180px;
    }
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

    p {
        width: 90%; /* the element needs a fixed width (in px, em, %, etc) */
        overflow: hidden; /* make sure it hides the content that overflows */
        white-space: nowrap; /* don't break the line */
        text-overflow: ellipsis; /* give the beautiful '...' effect */
    }
`;

export const Icon = styled.div`
    position: absolute;
    right: 0px;
    bottom: 0px;
    padding: 15px;
    svg {
        color: ${(props) => props.color || props.theme.colors.primary};
        width: 20px;
        height: 20px;
    }

    // tooltip
    &:after {
        content: "${(props) => props.tooltip}";
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        width: 190px;
        padding: 10px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        background-color: ${(props) =>
            props.color || props.theme.colors.primary};
        border-radius: 10px;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 1;
        pointer-events: none;
    }

    &:hover:after {
        opacity: 1;
    }
`;

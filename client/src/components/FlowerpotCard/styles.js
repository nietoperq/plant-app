import styled from "styled-components";
import { Card } from "../../shared_styles/Pages";

export const FlowerpotCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    width: 200px;
    height: 200px;
    margin-top: 30px;
    font-weight: 500;

    img {
        position: absolute;
        bottom: 50%;
    }

    button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        color: #fff;
        background-color: ${({ theme }) => theme.colors.primary};
        padding: 5px;
        border-radius: 100px;
        width: 100px;
        margin: 10px;
        z-index: 1;
        transition: 0.2s ease-in-out;

        svg {
            font-size: 18px;
            margin-right: 5px;
            margin-bottom: 2px;
        }

        &:not(:disabled):hover {
            filter: brightness(110%);
        }

        &:disabled {
            background-color: #ccc;
            cursor: auto;
        }
    }
`;

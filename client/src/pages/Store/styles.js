import styled from "styled-components";
import { Card } from "../../shared_styles/Pages";

export const StoreCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 200px;
    margin: 20px;
    button {
        font-size: 16px;
        font-weight: 500;
        &:not(:disabled) {
            cursor: pointer;
        }
    }
`;

export const Error = styled.p`
    color: red;
`;

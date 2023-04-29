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

export const AchievementNotification = styled.div`
    display: flex;
    align-items: center;

    svg {
        color: ${({ theme }) => theme.colors.primary};
        width: 40px;
        height: 40px;
        margin: 0 30px 0 20px;
    }

    a {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

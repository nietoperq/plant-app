import styled from "styled-components";
import { Section } from "../../shared_styles/Pages";

export const DashboardGrid = styled.div`
    display: grid;
    grid-template-areas:
        "s w"
        "p p";
    grid-template-columns: auto minmax(400px, 500px);
    grid-gap: 20px;
`;

export const DashboardSectionElements = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const WeatherSection = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 30px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    span {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const ClickableSpan = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        font-weight: 500;
    }
`;

export const DeleteConfirmation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 50px;

    span {
        cursor: pointer;
        color: ${({ theme }) => theme.colors.primary};
        margin: 0 10px;
    }

    svg {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 30px;
        margin: 10px;
    }
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

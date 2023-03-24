import styled from "styled-components";

export const DashboardSection = styled.div`
    background: #ffffffdd;
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 20px;

    span {
        color: ${({ theme }) => theme.colors.primary};
        cursor: pointer;
        margin-right: 10px;
    }
`;

export const DashboardSectionElements = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const ClickableSpan = styled.span`
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
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

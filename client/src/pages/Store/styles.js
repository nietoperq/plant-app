import styled from "styled-components";

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

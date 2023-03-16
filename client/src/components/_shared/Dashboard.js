import styled from "styled-components";

export const Dashboard = styled.div`
    padding: 20px 20px 20px 300px;
`;

export const DashboardSection = styled.div`
    background: #ffffffdd;
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 20px;

    span {
        color: ${({ theme }) => theme.colors.primary};
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

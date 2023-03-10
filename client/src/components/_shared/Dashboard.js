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

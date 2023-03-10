import styled from "styled-components";

export const SiteCard = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
    margin: 20px;
    transition: 0.1s ease;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(1);
    }
`;

export const SiteIcon = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 30px;
    margin-top: 5px;
`;

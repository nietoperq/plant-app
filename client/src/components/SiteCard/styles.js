import styled from "styled-components";

export const SiteCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #fff;
    border-radius: 20px;
    height: 150px;
    width: 150px;
    font-weight: 600;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
    margin: 20px 20px 20px 5px;
    transition: 0.1s ease;

    svg {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 40px;
    }

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(1);
    }

    &.selected {
        color: #fff;
        background: ${({ theme }) => theme.colors.primary};
        svg {
            color: #fff;
        }
    }

    @media (max-width: 1000px) {
        min-width: 100px;
        height: 100px;
    }
`;

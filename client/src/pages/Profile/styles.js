import styled from "styled-components";
import { Card } from "../../shared_styles/Pages";

export const ProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin: 20px;
    }
`;

export const HeaderStats = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
    margin: 20px;
    max-width: 1200px;
    text-align: center;

    span {
        color: ${({ theme }) => theme.colors.primary};
        display: block;
        font-size: 20px;
    }

    & div:nth-child(1),
    div:nth-child(3) {
        display: flex;
        justify-content: space-around;
        width: 33%;

        p {
            display: block;
            width: 100%;
            font-weight: 500;
        }

        span {
            display: block;
            font-weight: 500;
        }

        p:not(:last-child) {
            border-right: 2px solid #ddd;
        }
    }
`;

export const ProfileCard = styled(Card)`
    text-align: center;
    flex: 1;
    min-width: 200px;
    margin: 20px;
    p {
        font-size: 16px;
        font-weight: 500;
    }
    span {
        display: block;
        color: ${({ theme }) => theme.colors.primary};
        font-size: 30px;
        margin: 10px 0;
    }
`;

export const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

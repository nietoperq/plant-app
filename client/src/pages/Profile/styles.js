import styled from "styled-components";
import { Card, Section } from "../../shared_styles/Pages";

export const ProfileSection = styled(Section)`
    display: flex;
    align-items: center;
    gap: 40px;
    img {
        width: 240px;
        align-self: center;
    }
`;

export const ProfileStat = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 30px 30px 30px 0;
    svg {
        width: 50px;
        height: 50px;
        color: ${({ theme }) => theme.colors.primary};
        border-radius: 50%;
        padding: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    p {
        font-size: 16px;
    }
    span {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 20px;
        font-weight: 500;
    }
`;

export const StatsCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 200px;
    height: 200px;
    margin: 20px;
    p {
        font-size: 16px;
    }
    span {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 30px;
        margin: 10px 0;
    }
`;

export const RewardsSection = styled(Section)`
    h2 {
        display: inline;
    }
    button {
        display: inline;
        float: right;
        cursor: pointer;
        border: none;
        color: #fff;
        background-color: ${({ theme }) => theme.colors.primary};
        font-size: 16px;
        padding: 5px 10px 5px 10px;
        border-radius: 100px;

        &:hover {
            filter: brightness(110%);
        }

        &:active {
            scale: 0.99;
        }
    }
`;

export const RewardsCard = styled(Card)`
    svg {
        float: right;
        font-size: 20px;
    }

    span {
        float: right;
    }

    &.claimed svg {
        color: ${({ theme }) => theme.colors.primary};
    }

    &.locked {
        color: #aaa;
    }
`;

export const RewardsList = styled.div`
    overflow: auto;
    max-height: 50vh;
    margin-top: 20px;
`;

export const ProfileStats = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
`;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        "p p"
        "s r";
    grid-gap: 20px;
`;

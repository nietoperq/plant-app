import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Toggle = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 100%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    z-index: 100;
    visibility: hidden;

    transition: 0.5s ease;

    svg {
        width: 60%;
        height: 60%;
    }

    &.close {
        transform: translateX(260px);
    }

    &.open {
        transform: translateX(0%);
    }

    @media (max-width: 750px) {
        visibility: visible;
    }
`;

export const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    padding-right: 50px;

    transition: all 0.5s ease;

    & a:last-child {
        margin-top: auto;
    }

    @media (max-width: 750px) {
        &.hidden {
            transform: translateX(-100%);
        }

        &.visible {
            transform: translateX(0%);
            box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 100px;
        }
    }

    @media (max-width: 750px) {
        position: fixed;
        background: #fff;
        height: 100vh;
        z-index: 10;
        padding: 30px;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 700;
`;

export const User = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 70px 0;
    font-weight: 500;

    img {
        border-radius: 50%;
        width: 60px;
    }

    span {
        margin-right: 10px;
    }
`;

export const SidebarLink = styled(NavLink)`
    color: #888;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 5px 0;
    padding: 10px;
    font-weight: 500;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.1s ease;

    svg {
        font-size: 20px;
    }

    &:hover {
        color: ${({ theme }) => theme.colors.font};
    }

    &.active {
        color: ${({ theme }) => theme.colors.font};
        background-color: #f1f1f1;
    }
`;

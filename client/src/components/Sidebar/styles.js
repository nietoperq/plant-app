import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Sidebar = styled.div`
    position: fixed;
    top: 20px;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    width: 250px;
    padding: 20px;

    & a:last-child {
        margin-top: auto;
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

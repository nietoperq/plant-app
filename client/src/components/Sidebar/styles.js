import styled from "styled-components";
import { Link } from "react-router-dom";

export const Sidebar = styled.div`
    position: fixed;
    top: 20px;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    width: 250px;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    & a:last-child {
        margin-top: auto;
    }
`;

export const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 700;
`;

export const User = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 70px 0;

    img {
        border-radius: 50%;
        width: 50%;
    }

    span {
        margin: 0 10px;
    }
`;

export const SidebarLink = styled(Link)`
    color: #000;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.1s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

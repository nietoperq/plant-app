import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { RiLeafFill } from "react-icons/ri";

import {
    BiHomeHeart,
    BiUser,
    BiTrophy,
    BiStore,
    BiSliderAlt,
    BiDoorOpen,
    BiMenu,
    BiX,
} from "react-icons/bi";

import { RiShieldStarLine, RiCopperDiamondLine } from "react-icons/ri";

import * as Styled from "./styles";

function Sidebar() {
    const { currentUser, logout } = useContext(AuthContext);
    const img_src = currentUser.icon
        ? "/img/profile_pictures/" + currentUser.icon
        : "/img/profile_pictures/default.jpg";

    const [sidebarVisible, setSidebarVisible] = useState(false);

    function toggleSidebar() {
        setSidebarVisible(!sidebarVisible);
    }

    return (
        <>
            <Styled.Toggle
                className={sidebarVisible ? "close" : "open"}
                onClick={toggleSidebar}
            >
                {sidebarVisible ? <BiX /> : <BiMenu />}
            </Styled.Toggle>
            <Styled.Sidebar className={sidebarVisible ? "visible" : "hidden"}>
                <Styled.Logo>
                    <RiLeafFill />
                    CatLeaf
                </Styled.Logo>
                <Styled.User>
                    <img src={img_src} alt="" />

                    <div>
                        <h3>{currentUser.username}</h3>
                        <span>
                            <RiShieldStarLine /> {currentUser.lvl}
                        </span>
                        <span>
                            <RiCopperDiamondLine /> {currentUser.currency}
                        </span>
                    </div>
                </Styled.User>

                <Styled.SidebarLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? "active" : "none")}
                >
                    <BiHomeHeart />
                    Dashboard
                </Styled.SidebarLink>
                <Styled.SidebarLink
                    to="/profile"
                    className={({ isActive }) => (isActive ? "active" : "none")}
                >
                    <BiUser />
                    Profile
                </Styled.SidebarLink>
                <Styled.SidebarLink
                    to="/achievements"
                    className={({ isActive }) => (isActive ? "active" : "none")}
                >
                    <BiTrophy />
                    Achievements
                </Styled.SidebarLink>
                <Styled.SidebarLink
                    to="/store"
                    className={({ isActive }) => (isActive ? "active" : "none")}
                >
                    <BiStore />
                    Store
                </Styled.SidebarLink>
                <Styled.SidebarLink
                    to="/settings"
                    className={({ isActive }) => (isActive ? "active" : "none")}
                >
                    <BiSliderAlt />
                    Settings
                </Styled.SidebarLink>

                <Styled.SidebarLink to=" " onClick={logout}>
                    <BiDoorOpen /> Logout
                </Styled.SidebarLink>
            </Styled.Sidebar>
        </>
    );
}

export default Sidebar;

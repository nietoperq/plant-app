import React, { useContext } from "react";
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
} from "react-icons/bi";

import { RiStarLine, RiCopperDiamondLine } from "react-icons/ri";

import avatar from "../../img/pfp.jpg";

import * as Styled from "./styles";

function Sidebar() {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <Styled.Sidebar>
            <Styled.Logo>
                <RiLeafFill />
                CatLeaf
            </Styled.Logo>
            <Styled.User>
                <img src={avatar} alt="" />
                <h3>{currentUser.username}</h3>
                <div>
                    <span>
                        <RiStarLine /> {currentUser.xp}
                    </span>
                    <span>LVL {currentUser.lvl}</span>
                    <span>
                        <RiCopperDiamondLine /> {currentUser.currency}
                    </span>
                </div>
            </Styled.User>

            <Styled.SidebarLink to="/dashboard">
                <BiHomeHeart />
                Dashboard
            </Styled.SidebarLink>
            <Styled.SidebarLink to="/profile">
                <BiUser />
                Profile
            </Styled.SidebarLink>
            <Styled.SidebarLink to="/achievements">
                <BiTrophy />
                Achievements
            </Styled.SidebarLink>
            <Styled.SidebarLink to="/store">
                <BiStore />
                Store
            </Styled.SidebarLink>
            <Styled.SidebarLink to="/settings">
                <BiSliderAlt />
                Settings
            </Styled.SidebarLink>

            <Styled.SidebarLink onClick={logout}>
                <BiDoorOpen /> Logout
            </Styled.SidebarLink>
        </Styled.Sidebar>
    );
}

export default Sidebar;

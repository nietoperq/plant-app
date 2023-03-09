import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import * as Styled from "./styles";

function Sidebar() {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <Styled.Sidebar>
            <h1>👻</h1>
            <h2>{currentUser.username}</h2>
            <div className="sidebar-user-lvl">LVL: {currentUser.lvl}</div>
            <div className="sidebar-user-xp">⭐: {currentUser.xp}</div>
            <div className="sidebar-user-xp">🪙: {currentUser.currency}</div>
            <span className="logout" onClick={logout}>
                Logout
            </span>
        </Styled.Sidebar>
    );
}

export default Sidebar;

import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Sidebar() {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <div className="sidebar">
            <h1>👻</h1>
            <h2>{currentUser.username}</h2>
            <div className="sidebar-user-lvl">LVL: {currentUser.lvl}</div>
            <div className="sidebar-user-xp">⭐: {currentUser.xp}</div>
            <div className="sidebar-user-xp">🪙: {currentUser.currency}</div>
            <span className="logout" onClick={logout}>
                Logout
            </span>
        </div>
    );
}

export default Sidebar;

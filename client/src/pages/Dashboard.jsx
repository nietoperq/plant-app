import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Dashboard() {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <div>
            <span onClick={logout}>Logout</span>
            <p>Current user: {currentUser?.username}</p>
        </div>
    );
}

export default Dashboard;

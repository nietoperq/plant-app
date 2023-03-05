import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    async function login(inputs) {
        const res = await axios.post("/auth/login", inputs);
        setCurrentUser(res.data);
    }

    async function logout() {
        await axios.post("/auth/logout");
        setCurrentUser(null);
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    //TODO: remove user data from localStorage after jwt expires

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };

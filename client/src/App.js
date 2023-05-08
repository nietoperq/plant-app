import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoutes from "./utils/PrivateRoutes";
import GlobalStyles from "./shared_styles/Global";
import { ThemeProvider } from "styled-components";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Achievements from "./pages/Achievements";
import Store from "./pages/Store";
import Settings from "./pages/Settings";

const theme = {
    colors: {
        font: "#444",
        primary: "#C1A8A7",
        grey: "#777",
        body: "#eeeeee",
    },
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Profile />} path="/profile" />
                        <Route
                            element={<Achievements />}
                            path="/achievements"
                        />
                        <Route element={<Store />} path="/store" />
                        <Route element={<Settings />} path="/settings" />
                    </Route>
                    <Route element={<Home />} path="/" exact />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Register />} path="/register" />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;

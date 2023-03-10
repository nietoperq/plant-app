import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoutes from "./utils/PrivateRoutes";
import GlobalStyles from "./components/_shared/Global";
import { ThemeProvider } from "styled-components";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const theme = {
    colors: {
        primary: "#b0998f",
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
                    <Route element={<PrivateRoutes />} path="/dashboard">
                        <Route element={<Dashboard />} path="/dashboard" />
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

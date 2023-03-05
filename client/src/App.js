import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
    return (
        <div>
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
        </div>
    );
}

export default App;

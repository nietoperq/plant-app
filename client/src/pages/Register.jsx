import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

import { StyledContainer } from "../components/styles/Container.styled";
import { StyledAuth } from "../components/styles/Auth.styled";

function Register() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) navigate("/dashboard");
    }, []);

    function handleChange(e) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <StyledContainer>
            <StyledAuth>
                <h1>Register</h1>
                <form>
                    <input
                        required
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Register</button>
                    {error && <p className="error-message">{error}</p>}
                    <span>
                        Do you have an account?{" "}
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    </span>
                </form>
            </StyledAuth>
        </StyledContainer>
    );
}

export default Register;

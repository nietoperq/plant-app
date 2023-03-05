import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { currentUser, login } = useContext(AuthContext);

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
            await login(inputs);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <div className="flex-container">
            <div className="auth">
                <h1>Login</h1>
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
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Login</button>
                    {error && <p className="error-message">{error}</p>}
                    <span>
                        Don't have an account?{" "}
                        <Link className="link" to="/register">
                            Register
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;

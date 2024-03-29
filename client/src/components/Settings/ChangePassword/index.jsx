import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";

function ChangePassword() {
    const { currentUser, refreshAuthContext } = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        user_id: currentUser.user_id,
        old_password: "",
        new_password: "",
        confirm_new_password: "",
    });
    const [message, setMessage] = useState({ data: null, type: null });

    function handleChange(e) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.put("/auth/updatepassword", inputs);
            setMessage({ data: res.data, type: "success" });
        } catch (err) {
            console.log(err);
            setMessage({ data: err.response.data, type: "error" });
        }
    }

    return (
        <form>
            <input
                type="password"
                id="old_password"
                name="old_password"
                onChange={handleChange}
                placeholder="Old password"
                required
            ></input>
            <input
                type="password"
                id="new_password"
                name="new_password"
                onChange={handleChange}
                placeholder="New password"
                required
            ></input>
            <input
                type="password"
                id="confirm_new_password"
                name="confirm_new_password"
                onChange={handleChange}
                placeholder="Confirm password"
                required
            ></input>
            <div>
                <button onClick={handleSubmit}>Save</button>{" "}
                {message && message.type == "error" && (
                    <p style={{ color: "red" }}>{message.data}</p>
                )}
                {message && message.type == "success" && (
                    <p style={{ color: "green" }}>{message.data}</p>
                )}
            </div>
        </form>
    );
}

export default ChangePassword;

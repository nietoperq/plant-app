import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";

function ChangeEmailPreferences() {
    const { currentUser, refreshAuthContext } = useContext(AuthContext);

    const [emailNotifications, setEmailNotifications] = useState(
        currentUser.email_notifications
    );
    const [message, setMessage] = useState(null);

    function handleToggle() {
        setEmailNotifications((prev) => (prev ? 0 : 1));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.put("/user/updateemailnotification", {
                user_id: currentUser.user_id,
                email_notifications: emailNotifications,
            });
            setMessage("Saved!");
            refreshAuthContext();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="switch-container">
                <p className="switch-text">Enable email notifications</p>
                <label class="switch">
                    <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={handleToggle}
                    />
                    <div class="slider"></div>
                </label>
            </div>
            <div>
                {" "}
                <button type="submit">Save</button> {<span>{message}</span>}
            </div>
        </form>
    );
}

export default ChangeEmailPreferences;

import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";

const pictures = require.context(
    "../../../../public/img/profile_pictures",
    true
);

function ChangeProfilePicture() {
    const { currentUser, refreshAuthContext } = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        user_id: currentUser.user_id,
        icon: null,
    });

    const pictureList = pictures.keys().map((key) => {
        return {
            name: key.replace("./", ""),
        };
    });

    function handleChange(e) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.put("/user/updatepfp", inputs);
            refreshAuthContext();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <form>
            <div>
                {pictureList.map((picture) => (
                    <>
                        <input
                            type="radio"
                            value={picture.name}
                            id={picture.name}
                            name="icon"
                            onChange={handleChange}
                        ></input>
                        <label for={picture.name}>
                            <img
                                key={picture.name}
                                src={"/img/profile_pictures/" + picture.name}
                                alt={picture.name}
                            />
                        </label>
                    </>
                ))}
            </div>
            <button onClick={handleSubmit}>Save</button>
        </form>
    );
}

export default ChangeProfilePicture;

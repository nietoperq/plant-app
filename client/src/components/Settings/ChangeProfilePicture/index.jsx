import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";

import * as Styled from "./styles";

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
        <Styled.ProfilePictureSettings>
            <h2>Choose a profile picture</h2>
            <form>
                <Styled.PictureList>
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
                                    src={
                                        "/img/profile_pictures/" + picture.name
                                    }
                                    alt={picture.name}
                                />
                            </label>
                        </>
                    ))}
                </Styled.PictureList>
                <button onClick={handleSubmit}>Save</button>
            </form>
        </Styled.ProfilePictureSettings>
    );
}

export default ChangeProfilePicture;

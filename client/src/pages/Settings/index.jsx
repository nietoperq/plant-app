import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import axios from "axios";

import * as Pages from "../../shared_styles/Pages";
import * as Styled from "./styles";

const pictures = require.context("../../../public/img/profile_pictures", true);

function Settings() {
    const { currentUser, refreshAuthContext } = useContext(AuthContext);
    const [changePicture, setChangePicture] = useState(null);
    const [inputs, setInputs] = useState({
        user_id: currentUser.user_id,
        icon: null,
    });
    console.log(changePicture);

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
        <Pages.Container>
            <Sidebar />
            <Pages.Section>
                <h2>Settings</h2>
                <Pages.ClickableSpan onClick={() => setChangePicture(true)}>
                    Change profile picture
                </Pages.ClickableSpan>
            </Pages.Section>
            {changePicture && (
                <Modal handleClick={() => setChangePicture(false)}>
                    <Styled.Settings>
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
                                                    "/img/profile_pictures/" +
                                                    picture.name
                                                }
                                                alt={picture.name}
                                            />
                                        </label>
                                    </>
                                ))}
                            </Styled.PictureList>
                            <button onClick={handleSubmit}>Save</button>
                        </form>
                    </Styled.Settings>
                </Modal>
            )}
        </Pages.Container>
    );
}

export default Settings;

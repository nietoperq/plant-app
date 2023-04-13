import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

import {
    MdBalcony,
    MdOutlineBed,
    MdOutlineKingBed,
    MdOutlineKitchen,
    MdWorkOutline,
    MdOutlineHome,
} from "react-icons/md";

import * as Styled from "./styles";

function AddSite(props) {
    const { currentUser } = useContext(AuthContext);

    const { refreshSitesData, closeModal } = props;

    const [inputs, setInputs] = useState({
        user_id: currentUser.user_id,
        name: "",
        description: "",
        icon: "",
        is_indoor: "",
        humidity_level: "",
        light_level: "",
    });

    const [error, setError] = useState(null);

    function handleChange(e) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("/plants/addsite", inputs);
            if (res.data.sqlMessage) {
                setError(res.data.sqlMessage);
                return;
            }
            refreshSitesData();
            closeModal();
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <Styled.AddSite>
            <h1>Add new site</h1>
            <form>
                <p>Name and description</p>
                <input
                    required
                    type="text"
                    placeholder="site name"
                    name="name"
                    onChange={handleChange}
                />

                <textarea
                    placeholder="description"
                    name="description"
                    maxLength={500}
                    onChange={handleChange}
                />

                <p>Choose icon</p>
                <Styled.RadioGroup>
                    <Styled.IconRadio>
                        <input
                            type="radio"
                            name="icon"
                            value="bedroom"
                            id="bedroom"
                            onChange={handleChange}
                        />
                        <label htmlFor="bedroom">
                            <MdOutlineBed />
                        </label>
                    </Styled.IconRadio>
                    <Styled.IconRadio>
                        <input
                            type="radio"
                            name="icon"
                            value="balcony"
                            id="balcony"
                            onChange={handleChange}
                        />
                        <label htmlFor="balcony">
                            <MdBalcony />
                        </label>
                    </Styled.IconRadio>
                    <Styled.IconRadio>
                        <input
                            type="radio"
                            name="icon"
                            value="livingroom"
                            id="livingroom"
                            onChange={handleChange}
                        />
                        <label htmlFor="livingroom">
                            <MdOutlineKingBed />
                        </label>
                    </Styled.IconRadio>
                    <Styled.IconRadio>
                        <input
                            type="radio"
                            name="icon"
                            value="kitchen"
                            id="kitchen"
                            onChange={handleChange}
                        />
                        <label htmlFor="kitchen">
                            <MdOutlineKitchen />
                        </label>
                    </Styled.IconRadio>
                    <Styled.IconRadio>
                        <input
                            type="radio"
                            name="icon"
                            value="office"
                            id="office"
                            onChange={handleChange}
                        />
                        <label htmlFor="office">
                            <MdWorkOutline />
                        </label>
                    </Styled.IconRadio>
                    <Styled.IconRadio>
                        <input
                            type="radio"
                            name="icon"
                            value="home"
                            id="home"
                            onChange={handleChange}
                        />
                        <label htmlFor="home">
                            <MdOutlineHome />
                        </label>
                    </Styled.IconRadio>
                </Styled.RadioGroup>

                <p>Where is your site?</p>
                <Styled.RadioGroup>
                    <Styled.TextRadio>
                        <input
                            type="radio"
                            name="is_indoor"
                            value="1"
                            id="indoor"
                            onChange={handleChange}
                        />
                        <label htmlFor="indoor">Indoor</label>
                    </Styled.TextRadio>
                    <Styled.TextRadio>
                        <input
                            type="radio"
                            name="is_indoor"
                            value="0"
                            id="outdoor"
                            onChange={handleChange}
                        />
                        <label htmlFor="outdoor">Outdoor</label>
                    </Styled.TextRadio>
                </Styled.RadioGroup>

                <p>What is the humidity level?</p>
                <Styled.RadioGroup>
                    <Styled.TextRadio>
                        <input
                            type="radio"
                            name="humidity_level"
                            value="1"
                            id="humidity_low"
                            onChange={handleChange}
                        />
                        <label htmlFor="humidity_low">Low</label>
                    </Styled.TextRadio>

                    <Styled.TextRadio>
                        {" "}
                        <input
                            type="radio"
                            name="humidity_level"
                            value="2"
                            id="humidity_medium"
                            onChange={handleChange}
                        />
                        <label htmlFor="humidity_medium">Medium</label>
                    </Styled.TextRadio>
                    <Styled.TextRadio>
                        <input
                            type="radio"
                            name="humidity_level"
                            value="3"
                            id="humidity_high"
                            onChange={handleChange}
                        />
                        <label htmlFor="humidity_high">High</label>
                    </Styled.TextRadio>
                </Styled.RadioGroup>

                <p>What is the light level?</p>
                <Styled.RadioGroup>
                    <Styled.TextRadio>
                        <input
                            type="radio"
                            name="light_level"
                            value="1"
                            id="light_low"
                            onChange={handleChange}
                        />
                        <label htmlFor="light_low">Low</label>
                    </Styled.TextRadio>
                    <Styled.TextRadio>
                        <input
                            type="radio"
                            name="light_level"
                            value="2"
                            id="light_medium"
                            onChange={handleChange}
                        />
                        <label htmlFor="light_medium">Medium</label>
                    </Styled.TextRadio>
                    <Styled.TextRadio>
                        <input
                            type="radio"
                            name="light_level"
                            value="3"
                            id="light_high"
                            onChange={handleChange}
                        />
                        <label htmlFor="light_high">High</label>
                    </Styled.TextRadio>
                </Styled.RadioGroup>

                <button onClick={handleSubmit}>Add site</button>
                {error && <span className="error-message">{error}</span>}
            </form>
        </Styled.AddSite>
    );
}

export default AddSite;

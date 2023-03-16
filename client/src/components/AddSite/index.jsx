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
            await axios.post("/plants/addsite", inputs);
            refreshSitesData();
            closeModal();
        } catch (err) {
            setError(err.response.data);
        }
    }

    console.log(inputs);

    return (
        <Styled.AddSite>
            <h1>Add site</h1>
            <form>
                <p>Name</p>
                <input
                    required
                    type="text"
                    placeholder="site name"
                    name="name"
                    onChange={handleChange}
                />

                <p>Description</p>
                <textarea
                    placeholder="description"
                    name="description"
                    maxLength={500}
                    onChange={handleChange}
                />

                <p>Icon</p>
                <Styled.RadioGroup>
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
                </Styled.RadioGroup>

                <p>Is indoor</p>
                <Styled.RadioGroup>
                    <input
                        type="radio"
                        name="is_indoor"
                        value="1"
                        id="is_indoor"
                        onChange={handleChange}
                    />
                    <label htmlFor="is_indoor">Indoor</label>

                    <input
                        type="radio"
                        name="is_indoor"
                        value="0"
                        id="is_indoor"
                        onChange={handleChange}
                    />
                    <label htmlFor="is_indoor">Outdoor</label>
                </Styled.RadioGroup>

                <p>Humidity level</p>
                <Styled.RadioGroup>
                    <input
                        type="radio"
                        name="humidity_level"
                        value="1"
                        id="humidity_level"
                        onChange={handleChange}
                    />
                    <label htmlFor="humidity_level">Low</label>

                    <input
                        type="radio"
                        name="humidity_level"
                        value="2"
                        id="humidity_level"
                        onChange={handleChange}
                    />
                    <label htmlFor="humidity_level">Medium</label>

                    <input
                        type="radio"
                        name="humidity_level"
                        value="3"
                        id="humidity_level"
                        onChange={handleChange}
                    />
                    <label htmlFor="humidity_level">High</label>
                </Styled.RadioGroup>

                <p>Light level</p>
                <Styled.RadioGroup>
                    <input
                        type="radio"
                        name="light_level"
                        value="1"
                        id="light_level"
                        onChange={handleChange}
                    />
                    <label htmlFor="light_level">Low</label>

                    <input
                        type="radio"
                        name="light_level"
                        value="2"
                        id="light_level"
                        onChange={handleChange}
                    />
                    <label htmlFor="light_level">Medium</label>

                    <input
                        type="radio"
                        name="light_level"
                        value="3"
                        id="light_level"
                        onChange={handleChange}
                    />
                    <label htmlFor="light_level">High</label>
                </Styled.RadioGroup>

                <button onClick={handleSubmit}>Add site</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </Styled.AddSite>
    );
}

export default AddSite;

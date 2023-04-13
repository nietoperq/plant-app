import React, { useState, useEffect } from "react";
import axios from "axios";

import * as Styled from "./styles.js";

function AddPlant(props) {
    const { refreshPlantsData, closeModal } = props;
    const currentDate = new Date().toISOString().split("T")[0];
    const [plants, setPlants] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);

    const [inputs, setInputs] = useState({
        site_id: props.siteId,
        plant_id: "",
        last_watered: currentDate,
        last_fertilized: currentDate,
        date_added: currentDate,
        note: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/plants/getall`);
                setPlants(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
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
            const res = await axios.post("/plants/addplanttosite", inputs);
            if (res.data.sqlMessage) {
                setError(res.data.sqlMessage);
                return;
            }
            refreshPlantsData();
            closeModal();
        } catch (err) {
            setError(err.response.data);
        }
    }

    const plantsList = plants
        .filter((plant) =>
            plant.primary_name.toLowerCase().includes(search.toLowerCase())
        )
        .map((plant) => (
            <>
                <input
                    type="radio"
                    name="plant_id"
                    value={plant.plant_id}
                    id={"plant-" + plant.plant_id}
                    onChange={handleChange}
                />
                <label htmlFor={"plant-" + plant.plant_id}>
                    {plant.primary_name}
                </label>
            </>
        ));

    return (
        <Styled.AddPlant>
            <h1>Add plant</h1>
            <form>
                <p>Choose plant</p>
                <input
                    type="text"
                    id="search"
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Styled.SearchList>{plantsList}</Styled.SearchList>
                <p>When did you last water the plant?</p>
                <input
                    type="date"
                    id="last_watered"
                    name="last_watered"
                    max={currentDate}
                    onChange={handleChange}
                />
                <p>When did you last fertilize the plant?</p>
                <input
                    type="date"
                    id="last_fertilized"
                    name="last_fertilized"
                    max={currentDate}
                    onChange={handleChange}
                />
                <p>Your note</p>
                <textarea
                    placeholder="note"
                    name="note"
                    maxLength={500}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Add plant</button>
                {error && <span className="error-message">{error}</span>}
            </form>
        </Styled.AddPlant>
    );
}

export default AddPlant;

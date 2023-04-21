import React, { useState } from "react";

function ChangeLocation() {
    const [location, setLocation] = useState(
        localStorage.getItem("location") || ""
    );

    function handleLocationChange(event) {
        setLocation(event.target.value);
    }

    function handleLocationSubmit() {
        localStorage.setItem("location", location);
    }

    return (
        <>
            <h2>Change your location</h2>
            <form onSubmit={handleLocationSubmit}>
                <label htmlFor="location">Location:</label>
                <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                />
                <button type="submit">Save</button>
                <button onClick={() => setLocation("")}>Reset</button>
            </form>
        </>
    );
}

export default ChangeLocation;

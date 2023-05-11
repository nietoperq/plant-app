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
        <form onSubmit={handleLocationSubmit}>
            <input
                id="location"
                type="text"
                value={location}
                placeholder="Location"
                onChange={handleLocationChange}
            />
            <div>
                <button type="submit">Save</button>
                <button onClick={() => setLocation("")}>Reset</button>
            </div>
        </form>
    );
}

export default ChangeLocation;

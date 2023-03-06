import React from "react";

function PlantCard(props) {
    const { plantId, name, handleClick } = props;
    return (
        <div className="plant-card" id={plantId} onClick={handleClick}>
            <h1>🪴</h1>
            <p>{name}</p>
        </div>
    );
}

export default PlantCard;

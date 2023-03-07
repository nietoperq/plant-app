import React from "react";

function PlantDetails(props) {
    console.log(props);
    const {
        date_added,
        description,
        fertilizing_counter,
        fertilizing_frequency_summer,
        fertilizing_frequency_winter,
        flowerpot_id,
        icon,
        is_toxic,
        last_fertilized,
        last_watered,
        likes_misting,
        max_temp_summer,
        max_temp_winter,
        min_temp_summer,
        min_temp_winter,
        note,
        outdoor_summer,
        outdoor_winter,
        prefered_humidity,
        prefered_light_level,
        primary_name,
        watering_counter,
        watering_frequency_summer,
        watering_frequency_winter,
    } = props.plant;
    return (
        <div className="plant-details">
            <h1>🪴</h1>
            <h1>{primary_name}</h1>
            <p>{description}</p>
            <p>Prefered light level: {prefered_light_level}</p>
            <p>Prefered Humidity: {prefered_humidity}</p>
            <p>Is toxic: {is_toxic}</p>
            <p>Outdoor winter: {outdoor_winter}</p>
            <p>
                Temp winter: {min_temp_winter}°C - {max_temp_winter}°C
            </p>
            <p>Outdoor summer: {outdoor_summer}</p>
            <p>
                Temp summer: {min_temp_summer}°C - {max_temp_summer}°C
            </p>
            <p>Fertilized {fertilizing_counter} times</p>
            <p>Last fertilized: {last_fertilized} </p>
            <p>Watered {watering_counter} times</p>
            <p>Last watered: {last_watered} </p>
        </div>
    );
}

export default PlantDetails;

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import PlantGLTF from "../PlantGLTF";

function Model(props) {
    const ref = useRef();

    const size = props.size;

    useFrame((state, delta) => (ref.current.rotation.y += 0.2 * delta));

    return (
        <group
            ref={ref}
            {...props}
            dispose={null}
            position={props.pos}
            scale={[size, size, size]}
        >
            {props.children}
            <OrbitControls />
        </group>
    );
}

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
            <div style={{ width: "100%", height: "300px" }}>
                <Canvas camera={{ position: [5, 1, 0] }}>
                    <Model size={0.2} pos={[0, -3, 0]}>
                        <PlantGLTF filename={icon} />
                    </Model>
                    <Environment preset="dawn" />
                </Canvas>
            </div>
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

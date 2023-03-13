import React, { useRef, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import axios from "axios";

import PlantGLTF from "../PlantGLTF";

import {
    IoSnowOutline,
    IoWaterOutline,
    IoSunnyOutline,
    IoSkullOutline,
} from "react-icons/io5";
import { RiHazeLine } from "react-icons/ri";
import { TbGrain } from "react-icons/tb";

import * as Styled from "./styles";

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
    const {
        site_has_plant_id,
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

    const { refreshAuthContext } = useContext(AuthContext);

    async function waterPlant(e) {
        e.preventDefault();
        try {
            await axios.get(`/plants/water/${site_has_plant_id}`);
        } catch (err) {
            console.log(err);
        }
        refreshAuthContext();
    }

    async function fertilizePlant(e) {
        e.preventDefault();
        try {
            await axios.get(`/plants/fertilize/${site_has_plant_id}`);
        } catch (err) {
            console.log(err);
        }
        refreshAuthContext();
    }

    return (
        <Styled.PlantDetails>
            <h1>{primary_name}</h1>
            <Styled.PlantModel>
                <Canvas camera={{ position: [5, 1, 0] }}>
                    <Model size={0.2} pos={[0, -3, 0]}>
                        <PlantGLTF filename={icon} />
                    </Model>
                    <Environment preset="dawn" />
                </Canvas>
            </Styled.PlantModel>
            <div>
                <Styled.Button onClick={waterPlant}>Water Plant</Styled.Button>
                <Styled.Button onClick={fertilizePlant}>
                    Fertilize Plant
                </Styled.Button>
            </div>
            <p>{description}</p>
            <Styled.Grid>
                <Styled.Cell style={{ gridArea: "l" }}>
                    <h2>Light</h2>
                    <IoSunnyOutline />
                    {prefered_light_level}
                </Styled.Cell>

                <Styled.Cell style={{ gridArea: "h" }}>
                    <h2>Humidity</h2>
                    <IoWaterOutline />
                    {prefered_humidity}
                </Styled.Cell>

                <Styled.Cell style={{ gridArea: "m" }}>
                    <h2>Misting</h2>
                    <TbGrain />
                    {likes_misting}
                </Styled.Cell>

                <Styled.Cell style={{ gridArea: "t" }}>
                    <h2>Toxic</h2>
                    <IoSkullOutline />
                    {is_toxic}
                </Styled.Cell>

                <Styled.Cell style={{ gridArea: "w" }}>
                    <h2>Water</h2>
                    <p>
                        <RiHazeLine /> Every {watering_frequency_summer}th day
                        in summer
                    </p>
                    <p>
                        <IoSnowOutline /> Every {watering_frequency_winter}th
                        day in winter
                    </p>
                </Styled.Cell>

                <Styled.Cell style={{ gridArea: "f" }}>
                    <h2>Fertilizing</h2>
                    <p>
                        <RiHazeLine /> Every {fertilizing_frequency_summer}th
                        day in summer
                    </p>
                    <p>
                        <IoSnowOutline /> Every {fertilizing_frequency_winter}th
                        day in winter
                    </p>
                </Styled.Cell>

                <Styled.Cell style={{ gridArea: "i" }}>
                    <h2>Ideal temperature</h2>
                    <p>
                        <RiHazeLine /> {min_temp_summer}°C - {max_temp_summer}°C
                        Outdoor: {outdoor_summer}
                    </p>
                    <p>
                        <IoSnowOutline /> {min_temp_winter}°C -{" "}
                        {max_temp_winter}°C Outdoor: {outdoor_winter}
                    </p>
                </Styled.Cell>
            </Styled.Grid>
        </Styled.PlantDetails>
    );
}

export default PlantDetails;

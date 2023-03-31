import React, { useRef, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Gltf } from "@react-three/drei";
import axios from "axios";

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

    useFrame((state, delta) => (ref.current.rotation.y += 0.2 * delta));

    return (
        <group ref={ref} {...props} dispose={null}>
            {props.children}
        </group>
    );
}

function PlantDetails(props) {
    const [section, setSection] = useState(1);

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

    const { refreshPlantsData } = props;

    const { refreshAuthContext } = useContext(AuthContext);

    const model = `./models/${icon}.glb`;

    const date_w = new Date(last_watered);
    const date_f = new Date(last_fertilized);
    const present_date = new Date();
    present_date.setHours(0, 0, 0, 0);

    const water_next =
        Math.round(
            (date_w.getTime() - present_date.getTime()) / (1000 * 3600 * 24)
        ) + watering_frequency_winter;

    const fertilize_next =
        Math.round(
            (date_f.getTime() - present_date.getTime()) / (1000 * 3600 * 24)
        ) + fertilizing_frequency_winter;

    async function waterPlant(e) {
        e.preventDefault();
        try {
            await axios.get(`/plants/water/${site_has_plant_id}`);
            refreshAuthContext();
            refreshPlantsData();
        } catch (err) {
            console.log(err);
        }
    }

    async function fertilizePlant(e) {
        e.preventDefault();
        try {
            await axios.get(`/plants/fertilize/${site_has_plant_id}`);
            refreshAuthContext();
            refreshPlantsData();
        } catch (err) {
            console.log(err);
        }
    }

    function deletePlant() {
        props.delete();
    }

    function changeSection(event) {
        setSection(event.currentTarget.id);
        console.log(section);
    }

    return (
        <Styled.PlantDetails>
            <h1>{primary_name}</h1>
            <Styled.PlantModel>
                <Canvas camera={{ position: [5, 1, 0] }}>
                    <Model>
                        <Gltf src={model} scale={0.2} position={[0, -3, 0]} />
                    </Model>
                    <Environment preset="dawn" />
                    <OrbitControls />
                </Canvas>
            </Styled.PlantModel>
            <div>
                <Styled.Button onClick={waterPlant}>Water Plant</Styled.Button>
                <Styled.Button onClick={fertilizePlant}>
                    Fertilize Plant
                </Styled.Button>
                <Styled.Button onClick={deletePlant}>
                    Delete Plant
                </Styled.Button>
            </div>
            <div>
                <Styled.Button onClick={changeSection} id={1}>
                    Overview
                </Styled.Button>
                <Styled.Button onClick={changeSection} id={2}>
                    Description
                </Styled.Button>
                <Styled.Button onClick={changeSection} id={3}>
                    Plant info
                </Styled.Button>
            </div>

            {section == 1 && (
                <>
                    <Styled.Grid
                        style={{
                            gridTemplateAreas: '"t t" "w f"',
                        }}
                    >
                        <Styled.Cell style={{ gridArea: "t" }}>
                            <h2>Upcoming tasks</h2>
                            {water_next > 0 && (
                                <p>
                                    This plant needs to be watered in{" "}
                                    {water_next} days.
                                </p>
                            )}
                            {water_next == 0 && (
                                <p>This plant needs to be watered today.</p>
                            )}
                            {water_next < 0 && (
                                <p>
                                    This plant needs to be watered today.{" "}
                                    {-water_next} days overdue.
                                </p>
                            )}

                            {fertilize_next > 0 && (
                                <p>
                                    This plant needs to be fertilized in{" "}
                                    {fertilize_next} days.
                                </p>
                            )}
                            {fertilize_next == 0 && (
                                <p>This plant needs to be fertilized today.</p>
                            )}
                            {fertilize_next < 0 && (
                                <p>
                                    This plant needs to be fertilized today.{" "}
                                    {-fertilize_next} days overdue.
                                </p>
                            )}
                        </Styled.Cell>
                        <Styled.Cell style={{ gridArea: "w" }}>
                            <h2>Watering</h2>
                            <p>Last watered on {last_watered}.</p>
                            <p>
                                You watered this plant {watering_counter} times.
                            </p>
                        </Styled.Cell>
                        <Styled.Cell style={{ gridArea: "f" }}>
                            <h2>Fertilizing</h2>
                            <p>Last fertilized on {last_fertilized}.</p>
                            <p>
                                You fertilized this plant {fertilizing_counter}{" "}
                                times.
                            </p>
                        </Styled.Cell>
                    </Styled.Grid>
                </>
            )}
            {section == 2 && <p>{description}</p>}
            {section == 3 && (
                <>
                    <Styled.Grid
                        style={{
                            gridTemplateAreas: '"l h w w" "m t f f" "i i i i"',
                        }}
                    >
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
                                <RiHazeLine /> Every {watering_frequency_summer}
                                th day in summer
                            </p>
                            <p>
                                <IoSnowOutline /> Every{" "}
                                {watering_frequency_winter}th day in winter
                            </p>
                        </Styled.Cell>

                        <Styled.Cell style={{ gridArea: "f" }}>
                            <h2>Fertilizing</h2>
                            <p>
                                <RiHazeLine /> Every{" "}
                                {fertilizing_frequency_summer}th day in summer
                            </p>
                            <p>
                                <IoSnowOutline /> Every{" "}
                                {fertilizing_frequency_winter}th day in winter
                            </p>
                        </Styled.Cell>

                        <Styled.Cell style={{ gridArea: "i" }}>
                            <h2>Ideal temperature</h2>
                            <p>
                                <RiHazeLine /> {min_temp_summer}°C -{" "}
                                {max_temp_summer}°C Outdoor: {outdoor_summer}
                            </p>
                            <p>
                                <IoSnowOutline /> {min_temp_winter}°C -{" "}
                                {max_temp_winter}°C Outdoor: {outdoor_winter}
                            </p>
                        </Styled.Cell>
                    </Styled.Grid>
                </>
            )}
        </Styled.PlantDetails>
    );
}

export default PlantDetails;

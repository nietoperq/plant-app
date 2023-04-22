import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Gltf } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";

import PlantModel from "../PlantModel";

import { TbDroplet, TbPaperBag } from "react-icons/tb";

import * as Styled from "./styles";

function PlantCard(props) {
    const {
        site_has_plant_id,
        primary_name,
        icon,
        last_watered,
        last_fertilized,
        watering_frequency_summer,
        fertilizing_frequency_summer,
        flowerpot_id,
    } = props.plant;
    const { handleClick } = props;
    const [status, setStatus] = useState("");

    const flowerpot = flowerpot_id ? "flowerpot_" + flowerpot_id : "default";

    useEffect(() => {
        const date_w = new Date(last_watered);
        const date_f = new Date(last_fertilized);
        const present_date = new Date();
        present_date.setHours(0, 0, 0, 0);

        const water_next =
            Math.round(
                (date_w.getTime() - present_date.getTime()) / (1000 * 3600 * 24)
            ) + watering_frequency_summer;

        const fertilize_next =
            Math.round(
                (date_f.getTime() - present_date.getTime()) / (1000 * 3600 * 24)
            ) + fertilizing_frequency_summer;

        if (water_next <= 0) {
            setStatus(
                <Styled.Icon color="#61B1D4">
                    <TbDroplet />
                </Styled.Icon>
            );
        } else if (fertilize_next <= 0) {
            setStatus(
                <Styled.Icon color="#B2C182">
                    <TbPaperBag />
                </Styled.Icon>
            );
        } else {
            setStatus("");
        }
    }, [props.plant]);

    return (
        <Styled.PlantCard id={site_has_plant_id} onClick={handleClick}>
            <Styled.PlantModel>
                <Canvas camera={{ position: [7, 1, 0] }}>
                    <PlantModel
                        plant={icon}
                        pot={flowerpot}
                        size={0.3}
                        pos={[0, -4, 0]}
                        hoverAnimation
                    />
                    <Environment preset="dawn" />
                </Canvas>
            </Styled.PlantModel>
            <Styled.PlantInfo>
                <p>{primary_name}</p>
                {status}
            </Styled.PlantInfo>
        </Styled.PlantCard>
    );
}

export default PlantCard;

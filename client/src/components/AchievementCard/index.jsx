import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Gltf, Light } from "@react-three/drei";
import * as Styled from "./styles";

function AchievementCard(props) {
    const { name, description, icon, unlocked_on } = props.achievement;

    const filename = unlocked_on ? icon : "locked";
    const model = `./models/achievements/${filename}.glb`;

    const ref = useRef();
    return (
        <Styled.AchievementCard>
            <Styled.AchievementModel>
                <Canvas camera={{ position: [1, 0, 0] }}>
                    <mesh>
                        <Gltf
                            ref={ref}
                            src={model}
                            position={[-0.6, -0.8, 0]}
                        />
                    </mesh>
                    <Environment preset="dawn" />
                </Canvas>
            </Styled.AchievementModel>
            <Styled.AchievementInfo>
                {unlocked_on ? (
                    <p>
                        <strong>{name}</strong>
                        <span>Unlocked {unlocked_on}</span>
                    </p>
                ) : (
                    <p>
                        {name}
                        <span>To unlock:</span>
                    </p>
                )}
                <p>{description}</p>
            </Styled.AchievementInfo>
        </Styled.AchievementCard>
    );
}

export default AchievementCard;

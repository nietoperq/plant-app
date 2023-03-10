import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import PlantGLTF from "../PlantGLTF";

import { TbMoodSmileBeam } from "react-icons/tb";

import * as Styled from "./styles";

export function Model(props) {
    const [hovered, hover] = useState(false);
    const ref = useRef();
    console.log("hovered: " + hovered);

    const size = (hovered ? 1.1 : 1) * props.size;

    useFrame((state, delta) => (ref.current.rotation.y += 0.2 * delta));
    return (
        <group
            ref={ref}
            {...props}
            dispose={null}
            position={props.pos}
            scale={[size, size, size]}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
        >
            {props.children}
        </group>
    );
}

function PlantCard(props) {
    const { plantId, name, icon, handleClick } = props;

    return (
        <Styled.PlantCard id={plantId} onClick={handleClick}>
            <Styled.PlantModel>
                <Canvas camera={{ position: [7, 1, 0] }}>
                    <Model size={0.3} pos={[0, -4, 0]}>
                        <PlantGLTF filename={icon} />
                    </Model>
                    <Environment preset="dawn" />
                </Canvas>
            </Styled.PlantModel>
            <Styled.PlantInfo>
                <p>{name}</p>
                <TbMoodSmileBeam />
            </Styled.PlantInfo>
        </Styled.PlantCard>
    );
}

export default PlantCard;

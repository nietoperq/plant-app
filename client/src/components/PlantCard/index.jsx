import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import PlantGLTF from "../PlantGLTF";

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
            <div style={{ width: "300px", height: "300px" }}>
                <Canvas camera={{ position: [5, 2, 0] }}>
                    <Model size={0.2} pos={[0, -2, 0]}>
                        <PlantGLTF filename={icon} />
                    </Model>
                    <Environment preset="dawn" />
                </Canvas>
            </div>
            <p>{name}</p>
        </Styled.PlantCard>
    );
}

export default PlantCard;

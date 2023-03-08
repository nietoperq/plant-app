import React from "react";
import { useGLTF } from "@react-three/drei";

export function PlantGLTF(props) {
    const { filename } = props;
    const { nodes, materials } = useGLTF(`./models/${filename}.glb`);

    return (
        <group {...props}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.plant.geometry}
                material={materials.leaves}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001.geometry}
                material={materials.pot}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001_1.geometry}
                material={materials.brown}
            />
        </group>
    );
}

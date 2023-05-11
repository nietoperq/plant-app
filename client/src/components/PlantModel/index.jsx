import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Gltf } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
import { Material } from "three";

function PlantModel(props) {
    const { plant, pot, hoverAnimation, pos, size } = props;
    const [hovered, hover] = useState(false);
    const mesh = useRef();
    const { scale } = useSpring({
        scale: hovered ? props.size : 0.9 * props.size,
        config: config.gentle,
    });

    const plant_src = useMemo(() => `./models/plants/${plant}.glb`, [plant]);
    const pot_src = useMemo(() => `./models/pots/${pot}.glb`, [pot]);

    useFrame((state, delta) => (mesh.current.rotation.y += 0.2 * delta));

    return (
        <animated.mesh
            ref={mesh}
            dispose={null}
            position={pos}
            scale={hoverAnimation ? scale : size}
            onPointerOver={(_) => hover(true)}
            onPointerOut={(_) => hover(false)}
        >
            <Gltf src={plant_src} />
            <Gltf src={pot_src} />
        </animated.mesh>
    );
}

PlantModel.defaultProps = {
    pot: "default",
    hoverAnimation: false,
    size: 1,
    pos: [0, 0, 0],
};

export default PlantModel;

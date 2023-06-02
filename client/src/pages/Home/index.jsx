import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment } from "@react-three/drei";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { easing } from "maath";

import { RiLeafFill } from "react-icons/ri";

import * as Styled from "./styles";

export function Model(props) {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("./models/animation.glb");
    const { ref, actions, names } = useAnimations(animations);
    console.log(names);
    console.log(actions);

    useEffect(() => {
        const anim = actions?.Animation;
        anim.clampWhenFinished = true;
        anim.timeScale = 0.8;
        anim.play().setLoop(THREE.LoopOnce);
    }, []);

    useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [0 + state.mouse.x / 4, -0.8 + state.mouse.y / 4, 3.5],
            0.2,
            delta
        );
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            <group
                name="Scene"
                position={[0, -2, 0]}
                scale={0.5}
                rotation={[0, 1, 0]}
            >
                <mesh
                    name="Vert001"
                    castShadow
                    receiveShadow
                    geometry={nodes.Vert001.geometry}
                    material={materials.green}
                    position={[0, -0.9, 0]}
                    scale={0.11}
                >
                    <mesh
                        name="Vert002"
                        castShadow
                        receiveShadow
                        geometry={nodes.Vert002.geometry}
                        material={materials.green}
                        position={[-0.55, 0.97, 0.04]}
                        rotation={[-2.09, -0.83, 2.91]}
                        scale={0.09}
                    />
                    <mesh
                        name="Vert003"
                        castShadow
                        receiveShadow
                        geometry={nodes.Vert003.geometry}
                        material={materials.green}
                        position={[-0.9, 1.37, 0.01]}
                        rotation={[2.35, 0.35, 2.8]}
                        scale={0.06}
                    />
                    <mesh
                        name="Vert004"
                        castShadow
                        receiveShadow
                        geometry={nodes.Vert004.geometry}
                        material={materials.green}
                        position={[-1.06, 2.37, 0]}
                        rotation={[-2.52, 0.3, -2.89]}
                        scale={0.08}
                    />
                    <mesh
                        name="Vert005"
                        castShadow
                        receiveShadow
                        geometry={nodes.Vert005.geometry}
                        material={materials.green}
                        position={[-0.71, 2.96, 0]}
                        rotation={[2.53, -0.57, -2.61]}
                        scale={0.04}
                    />
                    <mesh
                        name="Vert006"
                        castShadow
                        receiveShadow
                        geometry={nodes.Vert006.geometry}
                        material={materials.green}
                        position={[-0.08, 3.55, 0]}
                        rotation={[-2.85, 0.63, -2.41]}
                        scale={0.04}
                    />
                    <mesh
                        name="Vert007"
                        castShadow
                        receiveShadow
                        geometry={nodes.Vert007.geometry}
                        material={materials.green}
                        position={[0.54, 4.07, -0.01]}
                        rotation={[2.49, -0.59, -2.51]}
                        scale={0.03}
                    />
                    <mesh
                        name="Vert008"
                        castShadow
                        receiveShadow
                        geometry={nodes.Vert008.geometry}
                        material={materials.green}
                        position={[0.96, 5.54, 0]}
                        rotation={[-3.13, 0, 2.97]}
                        scale={0.03}
                    />
                    <mesh
                        name="Vert009"
                        castShadow
                        receiveShadow
                        geometry={nodes.Vert009.geometry}
                        material={materials.green}
                        position={[0.91, 4.72, 0]}
                        rotation={[-2.55, 0.1, -3.02]}
                        scale={0.03}
                    />
                </mesh>
                <mesh
                    name="Circle"
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle.geometry}
                    material={materials.white}
                    position={[-0.19, -0.79, 0]}
                    scale={[0.9, 0.93, 0.9]}
                />
                <mesh
                    name="Circle001"
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle001.geometry}
                    material={materials.brown}
                    position={[-0.19, 0.22, 0]}
                />
            </group>
        </group>
    );
}

useGLTF.preload("./models/animation.glb");

function Home() {
    return (
        <Styled.Home>
            <Styled.Navbar>
                <h1>
                    <RiLeafFill />
                    CatLeaf
                </h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </Styled.Navbar>
            <Styled.Container>
                <Styled.Content>
                    <h2>The ultimate houseplant care companion</h2>
                    <p>
                        Immerse yourself in the world of plants and experience
                        the joy of nurturing your green friends. CatLeaf
                        provides you with valuable care tips and personalized
                        recommendations to ensure your houseplants flourish in
                        any environment. As you progress in your plant care
                        journey, you'll unlock badges and virtual plant
                        collectibles to showcase your accomplishments!
                    </p>
                    <Link to="/register">Join now</Link>
                </Styled.Content>
                <Styled.Animation>
                    <Canvas>
                        <Model />
                        <Environment preset="dawn" />
                    </Canvas>
                </Styled.Animation>
            </Styled.Container>
        </Styled.Home>
    );
}

export default Home;

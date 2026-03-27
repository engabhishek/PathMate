import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const ThreeScene = () => {
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full">
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} />

      {/* 3D Animated Sphere */}
      <Sphere args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial
          color="#009688"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
        />
      </Sphere>

      {/* Mouse control */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
};

export default ThreeScene;
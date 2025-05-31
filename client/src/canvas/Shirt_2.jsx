import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import state from "../store";

const Shirt2 = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_2.glb");

  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const meshKeys = Object.keys(nodes).filter((key) =>
    key.startsWith("Object_")
  );

  // Assign texture to all matching materials
  useEffect(() => {
    meshKeys.forEach((key) => {
      const mesh = nodes[key];
      if (mesh?.material && fullTexture) {
        mesh.material.map = fullTexture;
        mesh.material.needsUpdate = true;
      }
    });
  }, [fullTexture]);

  return (
    <group dispose={null}>
      {meshKeys.map((key) => {
        const mesh = nodes[key];
        return (
          <mesh
            key={key}
            geometry={mesh.geometry}
            material={mesh.material}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        );
      })}
    </group>
  );
};

export default Shirt2;

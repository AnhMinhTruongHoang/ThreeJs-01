import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";
import state from "../store";

const Shirt3 = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/womens_shirt.glb");
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((_, delta) => {
    Object.values(materials).forEach((material) => {
      if (material?.color) {
        easing.dampC(material.color, snap.color, 0.25, delta);
      }
    });
  });

  useEffect(() => {
    if (!fullTexture) return;
    Object.entries(materials).forEach(([name, material]) => {
      if (name === "Material.001") {
        // Thay đúng tên material của phần cần áp texture
        material.map = fullTexture;
        material.needsUpdate = true;
      }
    });
  }, [fullTexture, materials]);

  return (
    <group
      dispose={null}
      rotation={[0, 0, 0]}
      scale={[0.012, 0.012, 0.012]} // <- FIXED: Scale appropriately
      position={[0, -0.8, 0]} // <- FIXED: Lower model into frame
    >
      {Object.entries(nodes).map(([key, mesh]) => {
        if (!mesh.isMesh) return null;

        return (
          <mesh
            key={key}
            geometry={mesh.geometry}
            material={mesh.material}
            castShadow
            receiveShadow
          />
        );
      })}
    </group>
  );
};

export default Shirt3;

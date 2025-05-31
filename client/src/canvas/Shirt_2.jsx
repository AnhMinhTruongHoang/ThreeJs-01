import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import { easing } from "maath";
import state from "../store";

const Shirt2 = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_2.glb");

  const fullTexture = useTexture(snap.fullDecal);
  const logoTexture = useTexture(snap.logoDecal);

  // Animate color on all materials
  useFrame((_, delta) => {
    Object.values(materials).forEach((material) => {
      if (material?.color) {
        easing.dampC(material.color, snap.color, 0.25, delta);
      }
    });
  });

  // Remove texture map to allow Decal to show
  useEffect(() => {
    Object.values(materials).forEach((material) => {
      if (material.map) {
        material.map = null;
        material.needsUpdate = true;
      }
    });
  }, [materials]);

  return (
    <group dispose={null}>
      {Object.entries(nodes).map(([key, mesh]) => {
        if (!mesh.isMesh) return null;

        return (
          <mesh
            key={key}
            geometry={mesh.geometry}
            material={mesh.material}
            rotation={[-Math.PI / 2, 0, 0]}
            castShadow
            receiveShadow
          >
            {snap.isFullTexture && fullTexture && (
              <Decal
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                scale={1}
                map={fullTexture}
              />
            )}

            {snap.isLogoTexture && logoTexture && (
              <Decal
                position={[0, 0.04, 0.15]}
                rotation={[0, 0, 0]}
                scale={0.15}
                map={logoTexture}
                anisotropy={16}
                depthTest={false}
                depthWrite={true}
              />
            )}
          </mesh>
        );
      })}
    </group>
  );
};

export default Shirt2;

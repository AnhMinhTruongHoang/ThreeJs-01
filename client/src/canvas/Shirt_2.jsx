import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { easing } from "maath";
import state from "../store";

const Shirt2 = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_2.glb");
  const fullTexture = useTexture(snap.fullDecal);

  // Animate color across all materials
  useFrame((_, delta) => {
    Object.values(materials).forEach((material) => {
      if (material?.color) {
        easing.dampC(material.color, snap.color, 0.25, delta);
      }
    });
  });

  // Apply the full texture to all materials
  useEffect(() => {
    if (!fullTexture) return;

    Object.values(materials).forEach((material) => {
      material.map = fullTexture;
      material.needsUpdate = true;
    });
  }, [fullTexture, materials]);

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
          />
        );
      })}
    </group>
  );
};

export default Shirt2;

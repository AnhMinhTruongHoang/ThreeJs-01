import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import state from "../store";

const Shirt3 = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/womens_shirt.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  fullTexture.encoding = THREE.sRGBEncoding;

  const meshKeys = Object.keys(nodes).filter((key) =>
    key.startsWith("Object_")
  );

  useEffect(() => {
    meshKeys.forEach((key) => {
      const mesh = nodes[key];
      if (mesh?.material && fullTexture) {
        mesh.material.map = fullTexture;
        mesh.material.color.set(0xffffff); // Keep original tone
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

export default Shirt3;

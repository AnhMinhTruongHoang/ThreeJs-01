import React, { useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import state from "../store";

const Shirt3 = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/womens_shirt.glb");
  console.log("Nodes:", nodes);
  console.log("Materials:", materials);

  const fullTexture = useTexture(snap.fullDecal);
  const shirtRef = useRef();

  useEffect(() => {
    if (!fullTexture || !shirtRef.current) return;

    // 🔧 Critical texture fix
    fullTexture.encoding = THREE.sRGBEncoding;
    fullTexture.colorSpace = THREE.SRGBColorSpace;
    fullTexture.flipY = false;

    // 🧪 Create a new material with the texture
    const newMaterial = new THREE.MeshStandardMaterial({
      map: fullTexture,
      color: new THREE.Color(0xffffff),
      roughness: 1,
      metalness: 0,
    });

    shirtRef.current.material = newMaterial;
  }, [fullTexture]);

  return (
    <group dispose={null}>
      <mesh
        ref={shirtRef}
        geometry={nodes.geometry}
        material={nodes.material}
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]} // adjust only if needed
      />
    </group>
  );
};

export default Shirt3;

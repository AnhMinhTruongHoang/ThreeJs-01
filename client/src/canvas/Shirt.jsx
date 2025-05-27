import { useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";

const Shirt2 = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_2.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Select appropriate material
  const shirtMaterial =
    materials?.Shirt00_1Material4782 || materials?.Shirt00_1Button_FRONT;

  // Animate color if no texture is present
  useFrame((state, delta) => {
    if (shirtMaterial && !shirtMaterial.map) {
      easing.dampC(shirtMaterial.color, snap.color, 0.25, delta);
    }
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes?.Object_7?.geometry}
        material={shirtMaterial}
        material-roughness={1}
        dispose={null}
      >
        {/* Full shirt texture */}
        {snap.isFullTexture && fullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]} // Adjust if needed
            scale={1}
            map={fullTexture}
          />
        )}

        {/* Logo decal */}
        {snap.isLogoTexture && logoTexture && (
          <Decal
            position={[0, 0.1, 0.15]} // Adjust if needed
            rotation={[Math.PI, 0, 0]} // Change to [Math.PI, 0, 0] or [0, Math.PI, 0] if flipped
            scale={0.15}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt2;

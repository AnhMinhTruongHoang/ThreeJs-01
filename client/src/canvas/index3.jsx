import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei"; // Add OrbitControls
import Shirt3 from "./Shirt_3";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModel3 = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.1}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2} // optional: prevent flipping
        minPolarAngle={0}
      />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt3 />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel3;

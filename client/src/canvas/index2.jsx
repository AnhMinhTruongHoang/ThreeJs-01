import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt2 from "./Shirt_2";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModel2 = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt2 />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel2;

import { useRef } from "react";
import { type PointLight } from "three";
import { useFrame } from "@react-three/fiber";

/**
 * ライティング
 */
export const Lights = () => {
  const lightBlueRef = useRef<PointLight>(null);

  const RADIUS = 2;
  useFrame((state) => {
    if (!lightBlueRef.current) {
      return;
    }

    const x = RADIUS * Math.cos(state.clock.elapsedTime);
    const z = RADIUS * Math.sin(state.clock.elapsedTime);
    lightBlueRef.current.position.set(-x, 2, -z);
  });

  return (
    <>
      <pointLight color={"#f80e60"} intensity={40} position={[3, 0, 0]} />
      <pointLight color={"#dfb406"} intensity={40} position={[-3, 0, 0]} />
      <pointLight
        color={"#0693df"}
        intensity={40}
        position={[-2, 2, 2]}
        ref={lightBlueRef}
      />
    </>
  );
};

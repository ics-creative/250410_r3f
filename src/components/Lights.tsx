import { useRef } from "react";
import { type PointLight } from "three";
import { useFrame } from "@react-three/fiber";

/**
 * ライティング
 */
export const Lights = () => {
  const lightBlueRef = useRef<PointLight>(null);

  const progressRef = useRef(0); // 経過時間を格納するref
  const radius = 2;
  useFrame((_, delta) => {
    if (!lightBlueRef.current) {
      return;
    }

    progressRef.current += delta;
    const x = radius * Math.cos(progressRef.current);
    const z = radius * Math.sin(progressRef.current);
    lightBlueRef.current.position.set(-x, 2, -z);
  });

  return (
    <>
      <pointLight color={"#f80e60"} intensity={40} position={[3, 0, 0]} />
      <pointLight color={"#dfb406"} intensity={40} position={[-3, 0, 0]} />
      {/* ライト2 */}
      <pointLight
        color={"#0693df"}
        intensity={40}
        position={[-2, 2, 2]}
        ref={lightBlueRef}
      />
    </>
  );
};

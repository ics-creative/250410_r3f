import { FC, useRef } from "react";
import { type PointLight } from "three";
import { useFrame } from "@react-three/fiber";

export const Lights: FC = () => {
  const lightBlueRef = useRef<PointLight>(null);

  const angleRef = useRef(0);
  const speed = 3;
  const radius = 2;
  useFrame((_, delta) => {
    if (!lightBlueRef.current) {
      return;
    }

    angleRef.current += speed * delta;
    const x = radius * Math.cos(angleRef.current);
    const z = radius * Math.sin(angleRef.current);
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

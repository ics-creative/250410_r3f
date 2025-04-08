import { FC, useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";

type Props = ThreeElements["mesh"] & {
  torusArgs?: ThreeElements["torusGeometry"]["args"];
  meshRotation?: { x: number; y: number; z: number };
};

export const Ring: FC<Props> = ({ torusArgs, meshRotation, ...props }) => {
  const meshRef = useRef<Mesh>(null);
  const v = new Vector3();

  // 毎フレームの更新
  useFrame(() => {
    if (!meshRef.current) return;
    // 回転
    meshRef.current.rotation.x += meshRotation?.x ?? 0;
    meshRef.current.rotation.y += meshRotation?.y ?? 0;
    meshRef.current.rotation.z += meshRotation?.z ?? 0;

    meshRef.current.scale.lerp(v.set(1, 1, 1), 0.05);
  });

  return (
    <mesh {...props} ref={meshRef} scale={0}>
      <torusGeometry args={torusArgs} />
      <meshPhongMaterial
        color={"#1a75cf"}
        specular={"#b9997e"}
        emissive={"#fff"}
      />
    </mesh>
  );
};

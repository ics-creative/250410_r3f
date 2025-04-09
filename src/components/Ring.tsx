import { FC, useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import {
  GradientTexture,
  GradientType,
  MeshDistortMaterial,
} from "@react-three/drei";

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

    // 初回はスケール１にアニメーション
    meshRef.current.scale.lerp(v.set(1, 1, 1), 0.05);
  });

  return (
    <mesh {...props} ref={meshRef} scale={0}>
      <torusGeometry args={torusArgs} />
      <MeshDistortMaterial distort={0.7} speed={5}>
        <GradientTexture
          stops={[0, 1]}
          colors={["#e8ef29", "#12c4ec"]}
          type={GradientType.Radial}
        />
      </MeshDistortMaterial>
    </mesh>
  );
};

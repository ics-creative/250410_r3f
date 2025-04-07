import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import * as THREE from "three";

export const Box = () => {
  const [isActive, setIsActive] = useState(false);

  const meshRef = useRef<Mesh>(null);

  const v = new Vector3();

  // 毎フレームの更新
  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y = THREE.MathUtils.damp(
      meshRef.current.rotation.y,
      isActive ? 4 : 0,
      1,
      0.1,
    );

    // ポインターの位置に応じてメッシュを動かす
    meshRef.current.position.lerp(
      v.set(state.pointer.x * 3, 2 + state.pointer.y, 0),
      0.05, // 補間係数
    );

    if (meshRef.current.rotation.y >= 3.99) {
      setIsActive(false);
    }
  });

  const handleStartAnimation = () => {
    setIsActive(true);
  };

  return (
    <mesh
      ref={meshRef}
      position={[0, -5, 0]} // 初期位置
      castShadow={true} // 影を落とす
      onClick={handleStartAnimation}
    >
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

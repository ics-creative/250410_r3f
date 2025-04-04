import { FC, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import * as THREE from "three";
import { getAnimatedValue } from "../logics/getAnimatedValue.ts";
import { easeOutExpo, easeOutQuad } from "../logics/easing.ts";

export const BoxComponent: FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const meshRef = useRef<Mesh>(null);

  // 毎フレームの更新
  useFrame((state, delta) => {
    // まだアニメーションが始まっていない場合は何もしない
    if (!meshRef.current || !startTime) return;

    // アニメーション方法1
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      isActive ? -5 : 0,
      easeOutExpo(delta),
    );

    // アニメーション方法2
    // 現在の時刻を取得
    const now = performance.now();
    meshRef.current.scale.x = getAnimatedValue(now, startTime, {
      from: 1,
      to: 3,
      durationMs: 1400,
      easing: easeOutQuad,
    });

    // アニメーションが完了したら行う処理
    if (meshRef.current.scale.x >= 3) {
      console.log("Animation finished");
      setIsActive(false);
      setStartTime(null);
    }
  });

  const handleStartAnimation = () => {
    setStartTime(performance.now());
    setIsActive(true);
  };

  return (
    <mesh
      ref={meshRef}
      position={[0, 2, 0]}
      castShadow={true} // 影を落とす
      onClick={handleStartAnimation}
    >
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

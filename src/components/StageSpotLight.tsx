import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { SpotLight } from "three";

export type SpotLightRefType = {
  getRef: () => SpotLight | null;
};

type Props = ThreeElements["spotLight"] & {
  /** 点灯するか？ */
  isActive: boolean;
  /** インデックス */
  index: number;
};

/**
 * react-springを使用したメイン作例
 */
export const StageSpotLight = forwardRef<SpotLightRefType, Props>(
  ({ isActive, index, ...props }, ref) => {
    const lightRef = useRef<SpotLight>(null);

    // refを公開（
    useImperativeHandle(ref, () => ({
      getRef: () => lightRef.current,
    }));

    // ネジ巻きの回転に応じたアニメーション
    const SPEED = 5; // スポットライトの回転スピード（秒）
    const RADIUS = 2; // スポットライト円周移動時の半径
    useFrame((state, delta) => {
      if (!lightRef.current) {
        return;
      }
      const progress = SPEED * state.clock.elapsedTime; // 経過時間
      const x = RADIUS * Math.cos(progress + ((index * Math.PI) / 180) * 100);
      const z = RADIUS * Math.sin(progress + ((index * Math.PI) / 180) * 100);

      lightRef.current.position.set(x, lightRef.current.position.y, z);

      // 明度を変更する
      lightRef.current.intensity = THREE.MathUtils.damp(
        lightRef.current.intensity, // from
        isActive ? 50 : 0, // to
        isActive ? 4 : 8, //減衰係数。光り始める時はなだらかに、消える時は余韻少なめ
        delta,
      );
    });

    return (
      <spotLight
        {...props}
        angle={Math.PI / 8}
        intensity={0}
        penumbra={0.2}
        castShadow={true} // 影を落とす
        ref={lightRef}
      />
    );
  },
);

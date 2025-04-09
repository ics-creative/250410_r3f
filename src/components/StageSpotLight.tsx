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

const StageSpotLight = forwardRef<SpotLightRefType, Props>(
  ({ isActive, index, ...props }, ref) => {
    const lightRef = useRef<SpotLight>(null);

    // refを公開（
    useImperativeHandle(ref, () => ({
      getRef: () => lightRef.current,
    }));

    // ネジ巻きの回転に応じたアニメーション
    const progressRef = useRef(0); // 経過時間を格納するref
    const SPEED = 5; // スポットライトの回転スピード
    const RADIUS = 2; // スポットライト円周移動時の半径
    useFrame((_, delta) => {
      if (!lightRef.current) {
        return;
      }
      progressRef.current += SPEED * delta;
      const x =
        RADIUS *
        Math.cos(progressRef.current + ((index * Math.PI) / 180) * 100);
      const z =
        RADIUS *
        Math.sin(progressRef.current + ((index * Math.PI) / 180) * 100);

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
        intensity={40}
        penumbra={0.2}
        castShadow={true} // 影を落とす
        ref={lightRef}
      />
    );
  },
);

export default StageSpotLight;

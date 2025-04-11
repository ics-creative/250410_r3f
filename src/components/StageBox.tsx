import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import * as THREE from "three";
import { NEJI_POSITION } from "../consts/position.ts";

export type BoxRefType = {
  getMesh: () => Mesh | null;
};

type Props = ThreeElements["mesh"] & { shouldStick?: boolean };

/**
 * Box.tsxを記事解説で使用するため、メイン作例用にコピーして分割していいます
 * @see src/components/Box.tsx
 */
export const StageBox = forwardRef<BoxRefType, Props>(
  ({ shouldStick, ...props }, ref) => {
    // 回転アニメーションがアクティブか？
    const [isActive, setIsActive] = useState(false);
    // メッシュの参照
    const meshRef = useRef<Mesh>(null);

    // refを公開（スポットライトのターゲット用）
    useImperativeHandle(ref, () => ({
      getMesh: () => meshRef.current,
    }));

    const progressRef = useRef(0); // 経過時間を格納するref
    const v = new Vector3();
    // 毎フレームの更新
    useFrame((state, delta) => {
      if (!meshRef.current) {
        return;
      }

      // 経過時間を格納
      progressRef.current += delta * 2;

      // shouldStickがtrue時（ネジ巻きのホバー時を想定）は、xzの位置を固定する
      if (shouldStick) {
        meshRef.current.position.lerp(
          v.set(
            NEJI_POSITION[0],
            0.1 + Math.sin(progressRef.current) * 0.5,
            NEJI_POSITION[2],
          ),
          delta * 2, // 補間係数。リフレッシュレートによってアニメーションの速度に差異がでないようデルタタイムを渡す
        );
        meshRef.current.scale.lerp(
          v.set(0.3, 0.3, 0.3),
          delta * 2, // 補間係数
        );
      } else {
        // ポインターの位置に応じてメッシュのxy座標をなめらかに動かす
        meshRef.current.position.lerp(
          v.set(state.pointer.x * 3, state.pointer.y * 2, 0),
          delta * 2, // 補間係数
        );
        meshRef.current.scale.lerp(
          v.set(1, 1, 1),
          delta * 2, // 補間係数
        );
      }

      // クリック時（isActiveがtrueの時）に1回転させる
      meshRef.current.rotation.y = isActive
        ? THREE.MathUtils.damp(
            meshRef.current.rotation.y, // from
            2 * Math.PI, // to
            4, //減衰係数。値が大きいほど動きが急になり、小さいほど動きがなめらかになる
            delta, // 補間係数。リフレッシュレートによってアニメーションの速度に差異がでないようデルタタイムを渡す
          )
        : 0; // 0に戻す

      // 回転が終わった時の処理
      if (meshRef.current.rotation.y >= 2 * Math.PI - 0.01) {
        setIsActive(false);
      }
    });

    // クリック時の処理
    const handleClick = () => {
      setIsActive(true);
    };

    return (
      <mesh
        {...props}
        ref={meshRef}
        rotation={[-1, 0, 1]}
        position={[0, 15, 0]} // 初期位置（上から登場する）
        castShadow={true} // 影を落とす
        onClick={handleClick}
      >
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    );
  },
);

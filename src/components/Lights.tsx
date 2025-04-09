import { FC, useEffect, useRef } from "react";
import { type PointLight, PointLightHelper } from "three";
import { GUI } from "lil-gui";
import { useFrame, useThree } from "@react-three/fiber";

export const Lights: FC = () => {
  const ref = useRef<PointLight>(null);
  const lightBlueRef = useRef<PointLight>(null);
  const { scene } = useThree();

  // @see https://sbcode.net/react-three-fiber/lil-gui/
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const gui = new GUI();
    // 位置を定義
    gui.add(ref.current.position, "x", -10.0, 10.0);
    gui.add(ref.current.position, "y", -10.0, 10.0);
    gui.add(ref.current.position, "z", -10.0, 10.0);
    return () => {
      gui.destroy(); // コンポーネントのアンマウント時にクリーンアップ
    };
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    // ライトへの参照が正しく取得できたらhelperを作成し、Sceneに追加
    const helper = new PointLightHelper(ref.current, 0xff0000);
    scene.add(helper);

    // コンポーネントのアンマウント時にhelperを除去
    return () => {
      scene.remove(helper);
    };
  }, [scene]);

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
      <pointLight
        ref={ref}
        color={"#dfb406"}
        intensity={40}
        position={[-3, 0, 0]}
      />
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

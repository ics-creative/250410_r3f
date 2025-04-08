import { FC, useEffect, useRef } from "react";
import { type PointLight, PointLightHelper, SpotLight } from "three";
import { GUI } from "lil-gui";
import { useFrame, useThree } from "@react-three/fiber";

export const Lights: FC = () => {
  const ref = useRef<PointLight>(null);
  const lightRedRef = useRef<SpotLight>(null);
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
    const helper = new PointLightHelper(ref.current, 0.5, 0xff0000);
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
    if (!lightRedRef.current || !lightBlueRef.current) {
      return;
    }

    // 現在時間の継続時間に対する進捗度を算出
    angleRef.current += speed * delta;

    const x = radius * Math.cos(angleRef.current);
    const z = radius * Math.sin(angleRef.current);
    lightRedRef.current.position.set(x, 2, z);
    lightBlueRef.current.position.set(-x, 2, -z);
  });

  return (
    <>
      {/* キーライト */}
      <pointLight
        ref={ref}
        color={"#ffe8b7"}
        intensity={100}
        position={[0, 0, 5.5]}
        castShadow={true} // 影を落とす
        shadow-mapSize={[2048, 2048]} // 影の解像度を高めに設定
      />

      {/* ライト1 */}
      <spotLight
        color={"#ff9d8c"}
        intensity={40}
        penumbra={0.5}
        position={[3, 1.4, 0]}
        ref={lightRedRef}
        castShadow={true} // 影を落とす
      />

      {/* ライト2 */}
      <pointLight
        color={"#0693df"}
        intensity={40}
        position={[-0, 2.5, -3]}
        ref={lightBlueRef}
        castShadow={true} // 影を落とす
      />
    </>
  );
};

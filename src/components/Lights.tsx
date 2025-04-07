import { FC, useEffect, useRef } from "react";
import { type PointLight, PointLightHelper } from "three";
import { GUI } from "lil-gui";
import { useThree } from "@react-three/fiber";

export const Lights: FC = () => {
  const ref = useRef<PointLight>(null);
  const { scene } = useThree();

  // @see https://sbcode.net/react-three-fiber/lil-gui/
  useEffect(() => {
    const gui = new GUI();
    if (!ref.current) {
      return;
    }

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

  return (
    <>
      {/* キーライト */}
      <pointLight
        ref={ref}
        color={"#ffe8b7"}
        intensity={200}
        position={[1.4, 5, -2.9]}
        castShadow={true} // 影を落とす
        shadow-mapSize={[2048, 2048]} // 影の解像度を高めに設定
      />

      {/* リムライト1 */}
      <pointLight color={"#ff9d8c"} intensity={80} position={[5.6, 1.4, 2.7]} />

      {/* リムライト2 */}
      <pointLight
        color={"#0693df"}
        intensity={80}
        position={[-0.9, 2.5, -1.4]}
      />

      {/* 空気感用ライティング: 空の色, 地の色（反射光）, 光の強さ*/}
      <hemisphereLight
        args={["#fbf3e2", "#6697ff", 0.5]}
        position={[0, 10, 0]}
      />
    </>
  );
};

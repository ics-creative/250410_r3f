import { Canvas } from "@react-three/fiber";
import { Lights } from "../components/Lights.tsx";
import { Link } from "react-router-dom";
import { Box } from "../components/Box.tsx";

/**
 * アニメーションの実装サンプル
 */
export const InteractionPage = () => {
  return (
    <div className={"page"}>
      <div className="canvasContainer canvasContainer__withLink">
        <Canvas
          camera={{
            fov: 45, // 視野角
            near: 0.1,
            position: [0, 3, 10], // 位置
          }}
          shadows={"soft"} // 影を有効化
        >
          {/* 背景色 */}
          <color attach="background" args={["#0e0f10"]} />
          {/* フォグ */}
          <fog attach="fog" args={["#518db8", 5, 20]} />

          <Box />

          <Lights />
        </Canvas>
      </div>
      <Link to="/">ホームへ戻る</Link>
    </div>
  );
};

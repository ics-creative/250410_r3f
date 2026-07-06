import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { createWebGPURenderer } from "../lib/createWebGPURenderer.ts";

/**
 * 最小構成サンプル
 */
export const MinimumConfigPage = () => {
  return (
    <div className={"page"}>
      <div className="canvasContainer canvasContainer__withLink">
        <Canvas gl={createWebGPURenderer}>
          <mesh>
            {/* 球体ジオメトリ */}
            <sphereGeometry />
            {/* ノーマルマテリアル */}
            <meshNormalMaterial />
          </mesh>
        </Canvas>
      </div>
      <Link to="/">ホームへ戻る</Link>
    </div>
  );
};

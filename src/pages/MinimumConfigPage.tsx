import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { createWebGpuRenderer } from "../lib/createWebGpuRenderer.ts";

/**
 * 最小構成サンプル
 */
export const MinimumConfigPage = () => (
  <div className="page">
    <div className="canvasContainer canvasContainer__withLink">
      <Canvas gl={createWebGpuRenderer}>
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

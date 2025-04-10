import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";

export const MinimumConfigPage = () => {
  return (
    <div className={"page"}>
      <div className="canvasContainer canvasContainer__withLink">
        <Canvas>
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

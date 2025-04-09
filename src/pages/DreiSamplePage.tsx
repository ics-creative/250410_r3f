import { Canvas } from "@react-three/fiber";
import { Ring } from "../components/Ring.tsx";
import { CameraControls, Wireframe } from "@react-three/drei";
import { Link } from "react-router-dom";

const DreiSamplePage = () => {
  return (
    <div>
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

          <mesh scale={0.5}>
            <sphereGeometry />
            <meshBasicMaterial color={"#21ffbc"} />
            {/* consoleにインデックス化されたジオメトリに対してのエラーが出ますが、動作に影響はないので無視することにしています */}
            <Wireframe stroke={"#003cff"} thickness={0.1} simplify={true} />
          </mesh>

          {/* 飾りの輪っか */}
          <Ring
            rotation={[1, 0, 0]}
            torusArgs={[2.3, 0.02, 16, 100]}
            meshRotation={{ x: 0.001, y: 0.005, z: 0 }}
          />
          <Ring
            rotation={[0, 1, 0]}
            torusArgs={[2, 0.02, 16, 100]}
            meshRotation={{ x: -0.01, y: 0.005, z: 0 }}
          />
          <Ring
            rotation={[0.2, 0.5, 0]}
            torusArgs={[1.8, 0.2, 16, 100]}
            meshRotation={{ x: 0.01, y: 0.01, z: 0 }}
          />

          <pointLight
            color={"#3eaeec"}
            intensity={40}
            position={[0.6, 6, -8]}
          />
          <pointLight
            color={"#faeed0"}
            intensity={50}
            position={[-0.2, 0.6, 5]}
          />

          {/* ドラッグやスクロールでカメラを操作できるコントローラー */}
          <CameraControls makeDefault />
        </Canvas>
        <Link to="/">ホームへ戻る</Link>
      </div>
    </div>
  );
};

export default DreiSamplePage;

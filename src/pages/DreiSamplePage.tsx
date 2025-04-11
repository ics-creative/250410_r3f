import { Canvas } from "@react-three/fiber";
import { Ring } from "../components/Ring.tsx";
import { CameraControls, Sky, Wireframe } from "@react-three/drei";

/**
 * Dreiを使用したサンプル
 */
export const DreiSamplePage = () => {
  return (
    <div className={"page"}>
      <div className="canvasContainer">
        <Canvas
          camera={{
            fov: 45, // 視野角
            position: [0, 3, 10], // 位置
          }}
        >
          {/* 背景 */}
          <Sky
            distance={4000}
            sunPosition={[1, 1, 0]}
            turbidity={0.5}
            rayleigh={0.1}
          />

          <mesh scale={0.5}>
            <sphereGeometry />
            <meshPhongMaterial color={"#1fa6f8"} />
            {/* consoleにインデックス化されたジオメトリに対してのエラーが出ますが、動作に影響はないので無視することにしています */}
            <Wireframe stroke={"#ffffff"} thickness={0.1} simplify={true} />
          </mesh>

          {/* 飾りの輪っか */}
          <Ring
            rotation={[1, 0, 0]}
            torusArgs={[2.3, 0.15, 16, 100]}
            meshRotation={{ x: 0.001, y: 0.005, z: 0 }}
          />
          <Ring
            rotation={[0, 1, 0]}
            torusArgs={[2, 0.1, 16, 100]}
            meshRotation={{ x: -0.01, y: 0.005, z: 0 }}
          />
          <Ring
            rotation={[0.2, 0.5, 0]}
            torusArgs={[1.8, 0.02, 16, 100]}
            meshRotation={{ x: 0.01, y: 0.01, z: 0 }}
          />

          <pointLight color={"#b6fbfb"} intensity={100} position={[6, 5, -2]} />
          <ambientLight intensity={1} />

          {/* ドラッグやスクロールでカメラを操作できるコントローラー */}
          <CameraControls minDistance={1} maxDistance={100} />
        </Canvas>
      </div>
    </div>
  );
};

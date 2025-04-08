import { FC, Suspense } from "react";
import { Model } from "../components/Model.tsx";
import { Canvas } from "@react-three/fiber";
import { Box } from "../components/Box.tsx";
import { Ring } from "../components/Ring.tsx";
import { Lights } from "../components/Lights.tsx";

const MainPage: FC = () => {
  return (
    <div className="canvasContainer">
      <Canvas
        camera={{
          fov: 45, // 視野角
          position: [-8, 3, 8], // 位置
        }}
        shadows={"soft"} // 影を有効化
          // glでWebGLRendererのオプションを指定できる
        gl={{
            antialias: true,

        }}

      >
        {/* 背景色 */}
        <color attach="background" args={["#0e0f10"]} />
        {/* フォグ（空気遠近感を出す） */}
        <fog attach="fog" args={["#518db8", 5, 20]} />

        <Box />

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
          torusArgs={[1.8, 0.02, 16, 100]}
          meshRotation={{ x: 0.01, y: 0.01, z: 0 }}
        />

        {/* 床 */}
        <mesh
          position={[0, -5, 0]}
          receiveShadow={true} // 影を受け付ける
        >
          <boxGeometry args={[10, 6, 10]} />
          <meshStandardMaterial color={"#e5f9ff"} roughness={0} />
        </mesh>

        <Lights />

        {/*3Dモデルの読み込み。Suspenseで囲むことで読み込み後に3D空間に追加される */}
        <Suspense fallback={null}>
          <Model position={[0, -1.3, 4]} scale={[2, 2, 2]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MainPage;

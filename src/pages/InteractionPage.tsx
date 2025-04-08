import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "../components/Box.tsx";
import { Ring } from "../components/Ring.tsx";
import { Lights } from "../components/Lights.tsx";

const InteractionPage: FC = () => {
  return (
    <div className="canvasContainer">
      <Canvas
        camera={{
          fov: 45, // 視野角
          position: [0, 3, 10], // 位置
        }}
        shadows={"soft"} // 影を有効化
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

        <Lights />
      </Canvas>
    </div>
  );
};

export default InteractionPage;

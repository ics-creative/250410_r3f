import { Canvas } from "@react-three/fiber";
import { MainContents } from "../components/MainContents.tsx";

export const MainPage = () => {
  return (
    <div className={"page"}>
      <div className="canvasContainer">
        <Canvas
          camera={{
            fov: 45, // 視野角
            position: [-8, 3, 8], // 位置
          }}
          shadows={"soft"} // 影を有効化
        >
          {/* 背景色 */}
          <color attach="background" args={["#13151c"]} />

          <MainContents />

          {/* 床 */}
          <mesh
            position={[0, -5, 0]}
            receiveShadow={true} // 影を受け付ける
          >
            <boxGeometry args={[10, 6, 10]} />
            <meshStandardMaterial color={"#e5f9ff"} roughness={0} />
          </mesh>

          <pointLight
            color={"#ffecc5"}
            intensity={10}
            position={[1, 2, 3.5]}
            castShadow={true} // 影を落とす
            shadow-mapSize={[2048, 2048]} // 影の解像度を高めに設定
          />
        </Canvas>
      </div>
    </div>
  );
};

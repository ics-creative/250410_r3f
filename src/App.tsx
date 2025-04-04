import { Suspense, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { BoxComponent } from "./components/Box.tsx";
import { Lights } from "./components/Lights.tsx";
import { Model } from "./components/Model.tsx";
import { Ring } from "./components/Ring.tsx";
import { PointerTest } from "./components/PointerTest.tsx";

function App() {
  const [count, setCount] = useState(1);
  return (
    <>
      <div className="canvasContainer">
        <div className="buttonContainer">
          <output htmlFor="volume">{count}</output>
          <input
            className={"inputSlider"}
            type="range"
            id="volume"
            name="volume"
            min="-50"
            max="50"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>

        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 1000,
            position: [-10, 2, 8],
          }}
          shadows={"soft"}
        >
          {/* 背景色 */}
          <color attach="background" args={["#0e0f10"]} />
          {/* フォグ（空気遠近感を出す） */}
          <fog attach="fog" args={["#6bacda", 5, 20]} />

          <BoxComponent />

          <Ring
            props={{
              position: [0, 2, 0],
              rotation: [1, 0, 0],
            }}
            torusArgs={{
              args: [2.3, 0.05, 16, 100],
            }}
            meshRotation={{ x: 0.001, y: 0.005, z: 0 }}
          />

          <Ring
            props={{
              position: [0, 2, 0],
              rotation: [0, 1, 0],
            }}
            torusArgs={{
              args: [2, 0.05, 16, 100],
            }}
            meshRotation={{ x: -0.01, y: 0.005, z: 0 }}
          />

          <Ring
            props={{
              position: [0, 2, 0],
              rotation: [0.2, 0.5, 0],
            }}
            torusArgs={{
              args: [1.8, 0.05, 16, 100],
            }}
            meshRotation={{ x: 0.01, y: 0.01, z: 0 }}
          />

          {/* 床 */}
          <mesh
            position={[0, 0, 0]}
            receiveShadow={true} // 影を受け付ける
          >
            <boxGeometry args={[1000, 0.1, 12]} />
            <meshStandardMaterial color={"#e5f9ff"} roughness={0} />
          </mesh>

          {/* 壁 */}
          <mesh
            position={[5, 0, -5]}
            castShadow={true} // 影を落とす
            receiveShadow={true} // 影を受け付ける
          >
            <boxGeometry args={[12, 12, 0.1]} />
            <meshStandardMaterial color={"#e5f9ff"} roughness={0} />
          </mesh>

          <Lights />

          {/* 3Dモデルの読み込み。Suspenseで囲むことで読み込み後に3D空間に追加される */}
          <Suspense fallback={null}>
            <Model
              props={{
                position: [0, 0.8, 3],
                scale: [2, 2, 2],
              }}
              rotateY={count}
            />
          </Suspense>
        </Canvas>

        <PointerTest />
      </div>
    </>
  );
}

export default App;

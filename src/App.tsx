import { Suspense, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { BoxComponent } from "./components/Box.tsx";
import { Lights } from "./components/Lights.tsx";
import { Model } from "./components/Model.tsx";

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

          <mesh position={[0, 0, 2]} castShadow>
            <torusGeometry args={[3, 0.3, 16, 100]} />
            <meshPhongMaterial color={"#1a75cf"} specular={"#b9997e"} />
          </mesh>

          {/* 床 */}
          <mesh
            position={[0, 0, 0]}
            receiveShadow // 影を受け付ける
          >
            <boxGeometry args={[1000, 0.1, 12]} />
            <meshStandardMaterial color={"#e5f9ff"} roughness={0} />
          </mesh>

          {/* 壁 */}
          <mesh
            position={[5, 0, -5]}
            castShadow // 影を落とす
            receiveShadow // 影を受け付ける
          >
            <boxGeometry args={[12, 12, 0.1]} />
            <meshStandardMaterial color={"#e5f9ff"} roughness={0} />
          </mesh>

          <Lights />

          {/* 3Dモデルの読み込み。Suspenseで囲むことで読み込み後に3D空間に追加される */}
          <Suspense>
            <Model
              props={{
                position: [0, 0.8, 1],
                scale: [2, 2, 2],
              }}
              rotateY={count}
            />
            {/*/>*/}
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default App;

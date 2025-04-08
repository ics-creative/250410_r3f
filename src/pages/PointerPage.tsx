import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Cube } from "../components/Cube.tsx";
import { Link } from "react-router-dom";

const PointerPage: FC = () => {
  return (
    <div className="test">
      <h1>ポインターイベントの違い</h1>
      <div className="headerContainer">
        <h2>①伝播防止なし</h2>
        <h2>②伝播防止あり</h2>

        {/* 左: 伝播防止なし */}
        <div className="testCanvasContainer">
          <Canvas
            orthographic={true}
            camera={{
              zoom: 50, // ズーム倍率
              position: [-5, 10, 10],
            }}
          >
            <Cube position={[-0.5, 0, -0.5]} />
            <Cube position={[0, 0, 1]} />
            <hemisphereLight
              args={["#ffffff", "#ca60b5", 2]}
              position={[0, 10, 0]}
            />
          </Canvas>
        </div>
        {/* 右: 伝播防止あり */}
        <div className="testCanvasContainer">
          <Canvas
            orthographic={true}
            camera={{
              zoom: 50,
              position: [-5, 10, 10],
            }}
          >
            <Cube position={[-0.5, 0, -0.5]} />
            <Cube position={[0, 0, 1]} disablePropagated={true} />
            <hemisphereLight
              args={["#ffffff", "#ca60b5", 2]}
              position={[0, 10, 0]}
            />
          </Canvas>
        </div>
      </div>

      <Link to="/">ホームへ戻る</Link>
    </div>
  );
};

export default PointerPage;

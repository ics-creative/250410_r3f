import { Canvas } from "@react-three/fiber";
import { Cube } from "../components/Cube.tsx";
import { Link } from "react-router-dom";

export const PointerPage = () => {
  return (
    <div className={"page"}>
      <div className="pointerTestWapper">
        <h1>ポインターイベントの違い</h1>
        <div className="pointerLayout">
          <h2>①伝播防止なし</h2>
          <h2>②伝播防止あり</h2>

          {/* 左: 伝播防止なし */}
          <div className="pointerTestCanvasContainer">
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
                position={[0, 10, 2]}
              />
            </Canvas>
          </div>
          {/* 右: 伝播防止あり */}
          <div className="pointerTestCanvasContainer">
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
                position={[0, 10, 2]}
              />
            </Canvas>
          </div>
        </div>
      </div>

      <Link to="/">ホームへ戻る</Link>
    </div>
  );
};

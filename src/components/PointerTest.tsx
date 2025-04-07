import { Canvas } from "@react-three/fiber";
import { Cube } from "./Cube.tsx";

export const PointerTest = () => {
  return (
    <div className="test">
      <h1>ポインターイベントの違い</h1>
      <div className="headerContainer">
        <h2>①伝播防止なし</h2>
        <h2>②伝播防止あり</h2>
      </div>
      <div className="testCanvasContainer">
        <Canvas
          orthographic={true}
          camera={{
            zoom: 50, // ズーム倍率
            near: 1,
            far: 100,
            position: [10, 10, 10],
          }}
        >
          {/*左*/}
          <Cube position={[-1, 0, 1.5]} />
          <Cube position={[-2, 0, 1]} />

          {/*右*/}
          <Cube position={[1, 0, -1.5]} />
          <Cube position={[2, 0, -1]} isPropagated={true} />

          <hemisphereLight
            args={["#f4f1df", "#67c7ea", 2]}
            position={[0, 10, 0]}
          />
        </Canvas>
      </div>
    </div>
  );
};

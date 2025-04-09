import { Suspense, useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useEnergy } from "./useEnergy.ts";
import { Model } from "./Model.tsx";
import Box, { BoxRefType } from "./Box.tsx";
import StageSpotLight, { SpotLightRefType } from "./StageSpotLight.tsx";
import { NEJI_POSITION } from "../consts/position.ts";

/**
 * react-springを使用したメインコンテンツ部分
 */
export const MainContents = () => {
  // Boxコンポーネントの参照
  const boxRef = useRef<BoxRefType>(null);

  const lightRedRef = useRef<SpotLightRefType>(null);
  const lightYellowRef = useRef<SpotLightRefType>(null);
  const lightBlueRef = useRef<SpotLightRefType>(null);

  // スポットライトのターゲット設定
  const { scene } = useThree();
  useEffect(() => {
    const box = boxRef.current?.getMesh();
    const lightRed = lightRedRef.current?.getRef();
    const lightYellow = lightYellowRef.current?.getRef();
    const lightBlue = lightBlueRef.current?.getRef();
    if (!box || !lightRed || !lightBlue || !lightYellow) {
      return;
    }
    // スポットライトのターゲットをシーンに追加
    scene.add(lightRed.target);
    scene.add(lightYellow.target);
    scene.add(lightBlue.target);
    // boxをターゲットに指定
    lightRed.target = box;
    lightYellow.target = box;
    lightBlue.target = box;
  }, [scene]);

  // ネジ巻きの回転管理
  const { rotation, handleClick, isActive } = useEnergy();

  const [isHovered, setIsHovered] = useState(false);
  const handlePointerOver = () => {
    setIsHovered(true);
  };

  const handlePointerOut = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Box ref={boxRef} shouldStick={isHovered} />

      <StageSpotLight
        ref={lightRedRef}
        color={"#f80e60"}
        position={[0, 1, 0]}
        isActive={isActive}
        index={0}
      />
      <StageSpotLight
        ref={lightYellowRef}
        color={"#dfb406"}
        position={[0, 2, 0]}
        isActive={isActive}
        index={1}
      />
      <StageSpotLight
        ref={lightBlueRef}
        color={"#00e0ff"}
        position={[0, 2.5, 0]}
        isActive={isActive}
        index={2}
      />

      {/*3Dモデルの読み込み。Suspenseで囲むことで読み込み後に3D空間に追加される */}
      <Suspense fallback={null}>
        <Model
          position={NEJI_POSITION}
          scale={[2, 2, 2]}
          rotation={rotation}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        />
      </Suspense>
    </>
  );
};

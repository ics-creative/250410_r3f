import { useEffect, useState } from "react";
import { useSpring } from "@react-spring/three";

const MAX_ROTATION = 10; // = 5回転

/**
 * ネジ巻きの回転数管理を提供するhooks
 */
export const useEnergy = () => {
  const [energy, setEnergy] = useState(0); // 半回転分で管理とする

  const rotationY = energy * Math.PI;

  // springを定義（ターゲットのrotation.yが徐々に戻る）
  const { rotation } = useSpring({
    rotation: [0, -rotationY, 0],
    config: { mass: 1, tension: 50, friction: 20 }, // 動きのふんわり感
  });

  const handleClick = () => {
    // maxまでは、クリック時に半回転ごとに加算
    if (energy < MAX_ROTATION) {
      setEnergy((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // 常時ゆっくり減る
      setEnergy((prev) => (prev > 0 ? prev - 0.01 : 0));
    }, 16); // 約60fps
    return () => clearInterval(intervalId);
  }, []);

  return {
    /** ネジの回転 */
    rotation,
    /** ネジクリック時のハンドラ */
    handleClick,
    /** ネジが回転中か？ */
    isActive: energy > 0,
  };
};

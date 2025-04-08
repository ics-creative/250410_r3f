import { useEffect, useState } from "react";
import { useSpring } from "@react-spring/three";

export const useEnergy = () => {
  const [energy, setEnergy] = useState(0);
  const maxRotation = 4; // 半回転 4回分 = 2回転
  const anglePerClick = Math.PI; // 半回転

  const rotationY = energy * anglePerClick;

  // springを定義（ターゲットのrotation.yが徐々に戻る）
  const { rotation } = useSpring({
    rotation: [0, -rotationY, 0], // target rotation

    config: { mass: 1, tension: 50, friction: 20 }, // 動きのふんわり感
  });

  const handleClick = () => {
    if (energy < maxRotation) {
      setEnergy((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => (prev > 0 ? prev - 0.01 : 0)); // ゆっくり減る
    }, 16); // 約60fps

    return () => clearInterval(interval);
  }, []);

  return {
    /** ネジの回転 */
    rotation,
    /** ネジクリック時のハンドラ */
    handleClick,
  };
};

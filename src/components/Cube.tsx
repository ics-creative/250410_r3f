import { useState } from "react";
import { ThreeElements, ThreeEvent } from "@react-three/fiber";

type Props = ThreeElements["mesh"] & {
  /** 伝播を防止するか */
  disablePropagated?: boolean;
};

/**
 * ポインターイベント検証用の立方体
 */
export const Cube = ({ disablePropagated, ...props }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    if (disablePropagated) {
      // 手前のオブジェクトでイベントが発生したら伝播を止める
      event.stopPropagation();
    }
    setIsActive(true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    if (disablePropagated) {
      event.stopPropagation();
    }
    setIsActive(false);
  };

  return (
    <mesh
      {...props}
      scale={1.4}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry />
      <meshStandardMaterial color={isActive ? "#02bbff" : "#edce3c"} />
    </mesh>
  );
};

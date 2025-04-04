import { FC, useState } from "react";
import { ThreeElements, ThreeEvent } from "@react-three/fiber";

type Props = {
  props?: ThreeElements["mesh"];
  isPropagated?: boolean;
};

export const Cube: FC<Props> = ({ props, isPropagated }) => {
  const [isActive, setIsActive] = useState(false);

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    if (isPropagated) {
      event.stopPropagation();
    }
    setIsActive(true);
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    if (isPropagated) {
      event.stopPropagation();
    }
    setIsActive(false);
  };

  return (
    <mesh
      {...props}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry />
      <meshStandardMaterial color={isActive ? "#54b3ff" : "#cdf346"} />
    </mesh>
  );
};

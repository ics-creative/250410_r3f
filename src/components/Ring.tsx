import { FC, useRef } from "react";
import { ThreeElements, ThreeEvent, useFrame } from "@react-three/fiber";
import { Mesh, MeshPhongMaterial } from "three";

type Props = {
  props?: ThreeElements["mesh"];
  torusArgs?: ThreeElements["torusGeometry"];
  meshRotation?: { x: number; y: number; z: number };
};

export const Ring: FC<Props> = ({ props, torusArgs, meshRotation }) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhongMaterial>(null);

  // 毎フレームの更新
  useFrame(() => {
    if (!meshRef.current) return;
    // 回転
    meshRef.current.rotation.x += meshRotation?.x ?? 0;
    meshRef.current.rotation.y += meshRotation?.y ?? 0;
    meshRef.current.rotation.z += meshRotation?.z ?? 0;
  });

  const handleClick = (event: ThreeEvent<PointerEvent>) => {
    // 手前のオブジェクトで処理したら伝播を止める
    event.stopPropagation();
  };

  const handlePointerOver = () => {
    if (!materialRef.current) {
      return;
    }
    // 色を変える
    materialRef.current.emissive.set("#0033ff");
  };

  const handlePointerOut = () => {
    if (!materialRef.current) {
      return;
    }
    // 色を変える
    materialRef.current.emissive.set("#ffffff");
  };

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <torusGeometry {...torusArgs} />
      <meshPhongMaterial
        ref={materialRef}
        color={"#1a75cf"}
        specular={"#b9997e"}
        emissive={"#fff"}
      />
    </mesh>
  );
};

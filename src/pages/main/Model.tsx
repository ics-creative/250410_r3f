import { useLoader, type ThreeElements } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useEffect } from "react";
import * as THREE from "three";
import { a, type AnimatedProps, type SpringValue } from "@react-spring/three";

type Props = Omit<AnimatedProps<ThreeElements["group"]>, "rotation"> & {
  // AnimatedPropsで解決できなかったのでY軸回転だけ型を拡張
  rotationY?: SpringValue<number> | number;
};

/**
 * ネジ巻き
 */
export const Model = ({ rotationY, ...props }: Props) => {
  // 3Dモデルの読み込み
  const gltf = useLoader(GLTFLoader, "./gltf/neji.glb");

  useEffect(() => {
    // シャドウを有効化
    gltf.scene.traverse((obj: THREE.Object3D) => {
      const object = obj as THREE.Mesh;
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [gltf]);

  // アニメーションのためreact-springを使用
  return (
    <a.group {...props} rotation-y={rotationY}>
      <primitive object={gltf.scene} dispose={null} />
    </a.group>
  );
};

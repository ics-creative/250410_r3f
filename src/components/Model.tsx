import { ThreeElements, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { useEffect } from "react";
import * as THREE from "three";
import { a, AnimatedProps, SpringValue } from "@react-spring/three";

type Props = Omit<AnimatedProps<ThreeElements["group"]>, "rotation"> & {
  // AnimatedPropsで解決できなかったのでrotationだけ型を拡張
  rotation?: SpringValue<number[]> | number[];
};

/**
 * ネジ巻き
 */
export const Model = ({ ...props }: Props) => {
  // 3Dモデルの読み込み
  const gltf = useLoader(
    GLTFLoader,
    `${import.meta.env.BASE_URL}gltf/neji.glb`,
  ); // 本番・開発環境でパスを切り替える

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
  return <a.primitive {...props} object={gltf.scene} dispose={null} />;
};

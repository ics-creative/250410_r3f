import { ThreeElements, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { FC, useEffect } from "react";
import * as THREE from "three";
import { a } from "@react-spring/three";

type Props = ThreeElements["group"];

export const Model: FC<Props> = ({ ...props }) => {
  // 3Dモデルの読み込み
  const gltf = useLoader(GLTFLoader, "/gltf/neji.glb");

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

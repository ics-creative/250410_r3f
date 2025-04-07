import { useFrame, useLoader, ThreeElements } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // これでも動作するが型エラーが出るため、three-stdlib を追加し使用。
import { GLTFLoader } from "three-stdlib";
import { FC, useEffect, useRef } from "react";
import * as THREE from "three";

type Props = ThreeElements["group"] & { rotateY: number };

export const Model: FC<Props> = ({ rotateY, ...props }) => {
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

  const ref = useRef<THREE.Group>(null);

  // 毎フレームの更新
  useFrame(() => {
    if (!ref.current) {
      return;
    }
    ref.current.rotation.y -= rotateY * 0.01;
  });

  return <primitive {...props} object={gltf.scene} ref={ref} />;

  // メモ: @react-three/drei を入れる場合は、以下に同じ
  // return (
  //   <Gltf
  //     {...props}
  //     src="/gltf/neji.glb"
  //     castShadow={true} // 影を落とす
  //     receiveShadow={true} // 影を受け付ける
  //     ref={ref}
  //   />
  // );

  // メモ: 以下でもOK
  // const gltf = useGLTF("/gltf/neji.glb");
  // return <primitive {...props} object={gltf.scene} ref={ref} />;
};

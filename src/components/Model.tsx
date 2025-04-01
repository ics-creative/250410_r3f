import { ReactThreeFiber, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FC, useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  props?: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
  rotateY: number;
};

export const Model: FC<Props> = ({ props, rotateY }) => {
  const gltf = useLoader(GLTFLoader, "/gltf/neji.glb");
  console.log(gltf);

  useEffect(() => {
    // モデルのメッシュにシャドウを有効化
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
    if (!ref.current) return;
    ref.current.rotation.y -= rotateY * 0.01;
  });

  return <primitive {...props} object={gltf.scene} ref={ref} />;
};

// dreiを入れる場合、以下
// const gltf = useGLTF(modelPath);
// return <primitive {...props} object={gltf.scene} />;

// こちらでもOK
// return <Gltf src="/gltf/scene.gltf" scale={0.02} />;

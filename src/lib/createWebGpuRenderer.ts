import { WebGPURenderer, type WebGPURendererParameters } from "three/webgpu";

// React Three FiberのCanvasのgl propに渡すrenderer factory
export const createWebGpuRenderer = async (props: object) => {
  // React Three FiberのpropsはWebGL基準の型なので、WebGPU rendererの型として読み替える
  const renderer = new WebGPURenderer(props as WebGPURendererParameters);

  // WebGPUは非同期で初期化
  await renderer.init();

  return renderer;
};

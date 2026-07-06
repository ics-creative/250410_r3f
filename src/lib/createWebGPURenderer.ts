import type { DefaultGLProps } from "@react-three/fiber";
import { WebGPURenderer } from "three/webgpu";

export const createWebGPURenderer = async (props: DefaultGLProps) => {
  const renderer = new WebGPURenderer(props);
  await renderer.init();
  return renderer;
};

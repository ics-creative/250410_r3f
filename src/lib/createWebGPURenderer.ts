import type { CanvasProps } from "@react-three/fiber";
import { WebGPURenderer, type WebGPURendererParameters } from "three/webgpu";

type AsyncRendererFactory<T> = T extends (
  props: infer Props,
) => Promise<infer Renderer>
  ? (props: Props) => Promise<Renderer>
  : never;
type WebGPURendererFactory = AsyncRendererFactory<
  NonNullable<CanvasProps["gl"]>
>;

export const createWebGPURenderer: WebGPURendererFactory = async (props) => {
  const { canvas, powerPreference, ...rest } = props;
  const rendererProps = rest as WebGPURendererParameters;
  rendererProps.canvas = canvas as WebGPURendererParameters["canvas"];
  if (powerPreference !== "default") {
    rendererProps.powerPreference = powerPreference;
  }
  const renderer = new WebGPURenderer(rendererProps);
  await renderer.init();
  return renderer;
};

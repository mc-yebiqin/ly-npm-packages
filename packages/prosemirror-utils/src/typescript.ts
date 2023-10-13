import { EditorView } from "prosemirror-view";

export interface PluginView {
  unmount(): void;
}

export interface PluginConfigs {
  className?: string;
  [props: string]: any;
}

/** 参数用于计算坐标位置的对象 */
export type CalculatePositionProps = {
  /** 要计算的位置 */
  pos: number;
  /** 编辑器视图对象 */
  view: EditorView;
  /** 弹窗组件的容器元素 */
  element: HTMLElement;
  /** 容器对齐方式 */
  align?: "auto" | "left" | "center" | "right";
  /** 相对偏移量，表示为 [水平偏移, 垂直偏移] */
  offset?: [number, number];
};

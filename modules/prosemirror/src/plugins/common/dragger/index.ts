import PMUtils from "laoye-prosemirror-utils";
import { Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import Divider from "./Divider";

/**
 * 创建通用拖拽功能显示插件
 *
 * 该插件负责处理拖拽行为，并在拖拽时显示拖拽线条的指示器。通过在拖拽的起始和结束位置添加
 * 一个自定义的装饰元素，实现了拖拽线条的显示效果。此插件适用于需要在编辑器中实现拖拽
 * 交互并提供视觉指示的场景。
 *
 * 职责：
 * - 捕获编辑器中的拖拽行为。
 * - 在拖拽的起始和结束位置添加拖拽线条的装饰。
 * - 为拖拽线条指示器提供样式和定制支持。
 *
 * 业务场景示例：
 * 在富文本编辑器中，用户可能需要拖拽文本、图像或其他内容。该插件可以根据拖拽事件，
 * 在编辑器中显示拖拽线条的指示器，以提示用户正在进行拖拽操作。这在布局调整、内容排序
 * 或拖拽交互的场景中特别有用。
 */

export function commonDraggerPlugin() {
  /** 缓存光标的落点 */
  let dropPos: number | null = null;
  /** 缓存光标的坐标 */
  let dropCoords = { x: 0, y: 0 };

  const pluginViewer = PMUtils.createPluginViewer(Divider);

  /** 修正拖拽落单的位置 */
  const correctDropPosition = (view: EditorView, { x, y }: DragEvent) => {
    // 光标位置未发生改变，不做处理
    const cursorChanged = dropCoords.x !== x || dropCoords.y !== y;
    if (!cursorChanged) return null;
    dropCoords = { x, y };

    // 落点坐标不存在节点位置，终止后续操作
    const cursorPos = view.posAtCoords({ top: y, left: x })?.pos;
    if (!cursorPos) return null;

    // 访问落点位置所处的上下文信息，根据结构修正最终的落点位置
    const context = view.state.doc.resolve(cursorPos);
    const { parent, parentOffset } = context;
    if (!parent.isTextblock) return null; // 非文本容器不允许拖拽，终止后续操作

    // 如果落点位置小于文本内容的一半，则插入在该节点的上方，反之则在下方
    const revisePos =
      parentOffset < parent.nodeSize / 2 ? context.before() : context.after();
    const reviseOffset = (parent.attrs.indent || 0) * 24;
    if (revisePos === dropPos) return null; // 修正后的位置没有发生改变，终止无意义的处理

    // 更新缓存的位置后，返回数据供后续处理
    dropPos = revisePos;
    return { pos: revisePos, offset: reviseOffset };
  };

  /** 隐藏拖拽线条 */
  const hiddenDragLine = () => {
    dropPos = null;
    pluginViewer.updateOffset(null);
  };

  return new Plugin({
    view(view) {
      pluginViewer.mount(view.dom.parentElement);
      return {
        destroy() {
          pluginViewer?.unmount();
        },
      };
    },
    props: {
      handleDOMEvents: {
        dragover: (view: EditorView, event: DragEvent) => {
          const reviseData = correctDropPosition(view, event);
          if (!reviseData) return; // 修正数据不存在，终止处理

          const { pos, offset } = reviseData;
          const { left: cursorLeft, top: cursorTop } = view.coordsAtPos(pos);
          const { left: editorLeft, top: editorTop } = view.dom.getBoundingClientRect();

          const width = `calc(100% - ${offset}px)`;
          const offsetX = cursorLeft - editorLeft;
          const offsetY = cursorTop - editorTop;
          pluginViewer.updateOffset({ x: offsetX, y: offsetY, width });
        },
        drop() {
          hiddenDragLine();
        },
        dragend() {
          hiddenDragLine();
        },
        dragleave(view, event: any) {
          // 如果移出到容器之外，则隐藏掉工具条
          if (!view.dom.parentElement?.contains(event.fromElement)) hiddenDragLine();
        },
      },
    },
  });
}

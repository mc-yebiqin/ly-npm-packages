import PMUtils from "laoye-prosemirror-utils";
import { EditorView } from "prosemirror-view";
import { Plugin, TextSelection } from "prosemirror-state";

import SelectionBar from "./components";
/**
 * 多选工具条插件
 *
 * 该插件用于在记事本编辑器中实现多选文本时的工具条，提供针对所选文本的操作选项和工具按钮。
 * 插件负责监控编辑器的选择状态，显示多选工具条，并提供相关的操作选项。
 *
 * 职责：
 * - 监控编辑器的选择状态，判断是否处于多选文本的状态。
 * - 显示多选工具条，展示与所选文本相关的操作选项和工具按钮。
 * - 处理多选文本操作，例如复制、粘贴、格式调整等。
 *
 * 业务场景示例：
 * 在记事本编辑器中，用户可能需要对多个段落或文本块进行操作，如同时修改样式、复制到其他位置等。
 * 该插件可以在用户选择多个文本内容时，自动显示多选工具条，方便用户对所选内容进行集中操作。
 */
export const documentToolbarBySelection = (): Plugin => {
  let editorView: EditorView;
  let preventUpdate = true;
  const pluginViewer = PMUtils.createPluginViewer(SelectionBar);

  const listenMouseupEvt = () => {
    preventUpdate = false;
    setTimeout(() => updateToolbarVisible(editorView));
    window.removeEventListener("mouseup", listenMouseupEvt);
  };

  /** 更新工具条的可视状态 */
  const updateToolbarVisible = (view: EditorView) => {
    const { selection } = view.state;
    const { empty } = selection;
    // 存在选区并且是文本选区时，显示工具条
    const active = !empty && selection instanceof TextSelection;
    pluginViewer?.updateVisible(active);
  };

  const pluginObj = new Plugin({
    view(view: any) {
      editorView = view;
      pluginViewer.mount(view.dom.parentElement);

      return {
        update(view: EditorView) {
          if (preventUpdate) return;
          updateToolbarVisible(view);
        },
        destroy() {
          pluginViewer.unmount();
        },
      };
    },
    props: {
      handleDOMEvents: {
        mousedown() {
          preventUpdate = true;
          pluginViewer?.updateVisible(false);
          window.addEventListener("mouseup", listenMouseupEvt);
        },
      },
    },
  });

  return pluginObj;
};

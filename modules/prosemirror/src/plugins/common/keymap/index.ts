import { Plugin } from "prosemirror-state";
import { keyName } from "w3c-keyname";
import { EditorView } from "prosemirror-view";
import { KeymapCommand, modifiersKeyboard } from "@ly/prosemirror";

/**
 * Prosemirror 的通用键盘快捷键插件。
 *
 * 插件概述：
 * - 该插件主要目的是处理用户在编辑器中的键盘操作，包括处理特定快捷键的命令执行和基本快捷键的默认处理。
 *
 * 作用和职责：
 * - 主要作用：处理特定快捷键的命令执行，如果没有特定命令则交由基本快捷键处理。
 * - 具体职责：遍历编辑器的节点和标记类型，检查是否存在与按键关联的特定命令，若存在则执行相应的命令。
 *
 * 业务场景示例：
 * - 在富文本编辑器中，用户按下特定组合键（例如 Ctrl+B）时，触发文本加粗操作。
 *
 * 代码部分的功能和用途：
 * - `runSpecCommands`: 该函数用于遍历节点和标记类型的规格（schema），并执行特定快捷键的命令。
 * - `handleKeyDown`: 在键盘按下事件中被调用，检查用户按下的键，根据键名执行相应的命令或交由基本快捷键处理。
 */
export function commonKeymapPlugin(baseKeymap: KeymapCommand): Plugin {
  /**
   * 执行特定快捷键的命令。
   * @param {EditorView} view - 当前编辑器视图
   * @param {string} keyname - 按键的名称，包括修饰键（如果有）
   * @returns {boolean} - 如果命令成功执行返回 true，否则返回 false
   */
  const runSpecCommands = (view: EditorView, keyname: string): boolean => {
    const { state, dispatch } = view;
    const { nodes, marks } = state.schema;

    // 遍历编辑器的节点和标记类型，检查是否存在与按键关联的特定命令，最终返回处理结果
    const isSuccessful = [nodes, marks].some((item) => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const commandHandler = item[key].spec.keyboard?.[keyname];
          // 如果有与按键名称匹配的处理函数，则执行该命令并返回 true，如果未返回则默认返回 false
          if (commandHandler) return commandHandler(state, dispatch, view) ?? false;
        }
      }

      // 如果没有与按键名称匹配的处理函数，继续遍历下一个节点或标记类型
      return false;
    });

    return isSuccessful;
  };

  return new Plugin({
    props: {
      /**
       * 处理键盘按下事件。
       * @param {EditorView} view - 当前编辑器视图
       * @param {KeyboardEvent} event - 键盘事件对象
       * @returns {boolean} - 如果命令成功执行返回 true，否则返回 false
       */
      handleKeyDown: (view: EditorView, event: KeyboardEvent): boolean => {
        let name = keyName(event);
        const keyname = modifiersKeyboard(name, event);

        // 尝试执行特定快捷键的命令，如果成功执行则返回 true
        if (runSpecCommands(view, keyname)) return true;

        // 如果没有特定命令，执行基本快捷键的处理，如果存在基本快捷键则返回 true，否则返回 false
        const baseCommandHandler = baseKeymap[keyname];
        return baseCommandHandler?.(view.state, view.dispatch, view) ?? false;
      },
    },
  });
}

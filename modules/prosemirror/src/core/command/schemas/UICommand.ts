import { Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

/**
 * UICommand 类定义了一个用于处理用户界面交互的命令的基本结构。
 * 每个命令包括 execute、isActive 和 isEnabled 方法，用于执行、判断命令状态和启用/禁用命令。
 */
export class UICommand {
  /**
   * 执行命令的方法。默认情况下，返回 false，表示命令未执行。
   *
   * @param {EditorView} view - 当前的 Prosemirror 编辑器视图
   * @returns {boolean} - 返回 true 表示命令已执行，返回 false 表示命令未执行
   */
  execute = (...props: any): any => {
    return false;
  };

  /**
   * 验证节点的方法。默认情况下，返回 false，表示节点不通过验证。
   *
   * @param {Node} node - 要验证的节点对象
   * @returns {boolean} - 返回 true 表示节点通过验证，返回 false 表示节点不通过验证
   */
  validate = (node: Node): boolean => {
    return false;
  };

  /**
   * 判断命令是否处于激活状态的方法。默认情况下，返回 false，表示命令未激活。
   *
   * @param {EditorState} state - 当前的 Prosemirror 编辑器状态
   * @returns {boolean} - 返回 true 表示命令处于激活状态，返回 false 表示命令未激活
   */
  isActive = (...props: any): boolean => {
    return false;
  };

  /**
   * 判断命令是否可用（启用）的方法。默认情况下，返回 false，表示命令不可用。
   *
   * @param {EditorState} state - 当前的 Prosemirror 编辑器状态
   * @returns {boolean} - 返回 true 表示命令可用，返回 false 表示命令不可用
   */
  isEnabled = (state: EditorState): boolean => {
    return false;
  };
}

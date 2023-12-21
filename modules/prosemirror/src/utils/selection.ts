import PMUtils from "laoye-prosemirror-utils";
import { Node } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";

import { GroupSpecEnum, NodeTypeEnum } from "../shared";

/**
 * 检查编辑器选区内是否仅包含特定类型的节点。
 *
 * @param {EditorState} state - 当前的 Prosemirror 编辑器状态
 * @param {NodeTypeEnum} type - 指定的节点类型枚举值
 * @param {(node: Node) => boolean} [callback] - 可选参数，用于自定义节点的进一步验证逻辑
 * @returns {boolean} - 如果选区内仅包含指定类型的节点，返回 true；否则返回 false。
 */
export function isOnlySpecifiedNodeInSelection(
  state: EditorState,
  type: NodeTypeEnum,
  validate?: (node: Node) => boolean
): boolean {
  // 初始化结果为 true
  let result = true;
  // 获取当前编辑器状态中的文档、模式和选区信息
  const { doc, schema, selection } = state;

  // 获取指定节点类型的 schema 节点
  const nodeType = schema.nodes[type];
  // 解构选区的起始和结束位置
  const { from, to } = selection;

  // 使用 PMUtils.findBlockBetween 函数查找指定范围内的节点
  PMUtils.findBlockBetween(doc, from, to, (node) => {
    // 检查节点类型是否与目标节点类型相符
    if (node.type !== nodeType) {
      // 如果节点类型不符合，将结果置为 false，表示节点不符合条件
      result = false;
    } else if (validate) {
      // 如果节点类型符合且存在验证器，调用验证器对节点进行验证
      // 如果验证器返回 true，将结果置为 true，表示节点符合条件并继续查找
      // 如果验证器为 undefined 或返回 false，将结果置为 false，表示节点不符合条件并终止查找
      result = validate(node);
    }

    // 如果结果为 false，表示节点不符合条件，终止查找
    if (!result) return true;
  });

  // 返回结果，指示选区内是否仅包含指定类型的节点
  return result;
}

/**
 * 检查选区范围内是否只包含满足特定条件的节点属性的函数。
 * @param state - 编辑器当前状态对象。
 * @param validate - 用于验证节点的函数，如果节点属性满足条件返回 true，否则返回 false。
 * @returns 如果选区范围内只包含满足特定条件的节点属性，返回 true；否则，返回 false。
 */
export function isOnlySpecifiedAttrsInSelection(
  state: EditorState,
  validate: (node: Node) => boolean
): boolean {
  let result = true; // 用于标识选区范围内是否只包含满足特定条件的节点属性

  const { doc, selection } = state;
  const { from, to } = selection; // 获取选区范围的起始和结束位置

  // 使用 PMUtils.findBlockBetween 函数遍历选区范围内的节点
  PMUtils.findBlockBetween(doc, from, to, (node) => {
    // 调用传入的 validate 函数，验证节点属性是否满足条件
    result = validate(node);

    // 如果当前节点的属性不满足条件，立即返回 false，中断遍历
    if (!result) return true;
  });

  return result; // 返回选区范围内是否只包含满足特定条件的节点属性的结果
}

/**
 * 在编辑器选区内替换特定类型的节点。
 *
 * @param {EditorView} view - 当前的 Prosemirror 编辑器视图
 * @param {string} type - 要替换的节点类型的字符串表示
 * @returns {boolean} - 如果成功替换节点返回 true，否则返回 false
 */
export function replaceNodesInSelection(
  view: EditorView,
  type: string,
  attrs: any = {}
): boolean {
  // 从编辑器视图中获取当前的状态和分发函数
  const { state, dispatch } = view;
  // 从状态中获取文档、模式和选区信息
  const { doc, schema, selection } = state;

  // 获取要替换的节点类型
  const replaceType = schema.nodes[type];

  // 初始化一个新的变换（transaction）对象
  let tr = state.tr;
  // 解构选区的起始和结束位置
  const { from, to } = selection;

  // 使用 PMUtils.findBlockBetween 函数查找选区内的节点
  PMUtils.findBlockBetween(doc, from, to, (node, pos) => {
    // 检查当前节点的组属性是否与要替换的节点类型相同
    if (node.type.groups.includes(GroupSpecEnum.BasicTextBlock)) {
      // 如果节点类型相同，创建一个新的变换对象，设置文本块类型和属性
      tr = tr.setBlockType(pos, pos + node.nodeSize, schema.nodes[type], {
        ...node.attrs,
        ...attrs,
      });
    }
  });

  // 分发替换节点的变换，并设置元信息（meta）和滚动到视图
  dispatch(tr.setMeta("replaceNodesInSelection", type).scrollIntoView());

  // 返回 true，表示成功替换节点
  return true;
}

/**
 * 在编辑器选区内替换特定类型的节点。
 *
 * @param {EditorView} view - 当前的 Prosemirror 编辑器视图
 * @param {string} type - 要替换的节点类型的字符串表示
 * @returns {boolean} - 如果成功替换节点返回 true，否则返回 false
 */
export function changeAttrsInSelection(view: EditorView, attrs: any = {}): boolean {
  // 从编辑器视图中获取当前的状态和分发函数
  const { state, dispatch } = view;
  // 从状态中获取文档、模式和选区信息
  const { doc, selection } = state;

  // 初始化一个新的变换（transaction）对象
  let tr = state.tr;
  // 解构选区的起始和结束位置
  const { from, to } = selection;

  // 使用 PMUtils.findBlockBetween 函数查找选区内的节点
  PMUtils.findBlockBetween(doc, from, to, (node, pos) => {
    tr = tr.setNodeMarkup(pos, undefined, {
      ...node.attrs,
      ...attrs,
    });
  });

  // 分发替换节点的变换，并设置元信息（meta）和滚动到视图
  dispatch(tr.scrollIntoView());

  // 返回 true，表示成功替换节点
  return true;
}

// export function changeNodeInfoInSelection(
//   type?: string,
//   attrs = {},
//   marks: Mark[] = []
// ): Command {
//   return (state, dispatch) => {
//     if (dispatch) {
//       const { doc, schema, selection } = state;
//       const nodeType = type ? schema.nodes[type] : undefined;
//       const { from, to } = selection;

//       let tr = state.tr;
//       PMUtils.findBlockBetween(doc, from, to, (node, pos) => {
//         if (GroupSpecEnum.BasicTextBlock) {
//           const newAttrs = { ...node.attrs, ...attrs };
//           tr = tr.setNodeMarkup(pos, nodeType, newAttrs, marks);
//         }
//       });

//       dispatch(tr.scrollIntoView());
//       return true;
//     }
//     return false;
//   };
// }

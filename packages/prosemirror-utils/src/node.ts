import { Node } from "prosemirror-model";

/**
 * 在给定节点中查找位于指定范围内的节点。
 *
 * @param node - 要搜索的节点
 * @param from - 范围的起始位置
 * @param to - 范围的结束位置
 * @param callback - 回调函数，接收每次遍历的节点信息
 */
export const findNodeBetween = (
  node: Node,
  from: number,
  to: number,
  callback: (node: Node, pos: number, index: number) => void | boolean
) => {
  findNodeDescendant(node, (node, pos, index) => {
    // 偏移量如果超过边界，则结束遍历
    if (pos > to) return true;

    // 该节点的位置选区处于查找范围内的话，则执行处理回调
    if (pos + node.nodeSize > from) {
      const result = callback(node, pos, index);
      if (result) return true;
    }

    /** 该遍历不针对子节点，所以不需要后续遍历 */
    if (node.isTextblock) return false;
  });
};

/**
 * 递归遍历给定节点及其子节点，并对每个节点应用回调函数。
 *
 * @param node - 要遍历的节点
 * @param callback - 回调函数，接收每次遍历的节点信息
 * @param offset - 起始偏移位置
 * @returns 返回找到的节点或 undefined
 */
export const findNodeDescendant = (
  node: Node,
  callback: (node: Node, pos: number, index: number) => void | boolean,
  offset?: number
): any => {
  let pos = offset ?? 0;

  // 如果该节点有子内容，则遍历所有子内容
  const { content } = node.content as any;

  content?.find?.((node: Node, index: number) => {
    // 返回具体结果，则表示遍历结束
    const result = callback(node, pos, index);
    if (result) return true;

    // 如果返回的值不为 false 则递归遍历其子节点
    if (result !== false) {
      const childResult = findNodeDescendant(node, callback, pos + 1);
      if (childResult) return true;
    }

    // 更新下一个子节点的偏移位置
    pos += node.nodeSize;
  });
};

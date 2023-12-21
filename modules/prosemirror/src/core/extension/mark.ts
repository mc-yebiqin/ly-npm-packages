import { ExtensionMark } from "./typescript";

/**
 * 将传入的 props 参数用于组装节点规格对象。
 * @param props - ExtensionMark 类型的对象，包含节点规格的属性。
 * @returns 组装好的节点规格对象。
 */
function assemblyNodeSpec(props: ExtensionMark) {
  // 从 props 参数中提取 attrs、parseHTML 和 renderHTML 属性，将其余属性收集到 others 变量中
  const { parseHTML, renderHTML, ...others } = props;

  // 返回包含节点规格对象的各个属性的对象
  return {
    // 将 renderHTML 属性作为 toDOM 函数
    toDOM: renderHTML,
    // 如果 parseHTML 存在，则将其作为函数调用结果，否则为 undefined
    parseDOM: parseHTML?.(),
    // 将其他属性添加到节点规格对象中
    ...others,
  };
}

/**
 * 负责创建节点规格对象的工厂类。
 */
export class MarkFactory {
  /**
   * 创建节点规格对象的静态方法。
   * @param props - ExtensionMark 类型的对象，包含节点规格的属性。
   * @returns 组装好的节点规格对象。
   */
  static create(props: ExtensionMark) {
    // 调用 assemblyNodeSpec 函数，传入 props 参数，并返回组装好的节点规格对象
    return assemblyNodeSpec({ ...props });
  }
}

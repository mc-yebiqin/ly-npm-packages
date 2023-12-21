import { Node } from "prosemirror-model";

import { joinListValue } from "../../utils";
import { AlignTypeEnum, ExtensionNode, GroupSpecEnum } from "../../shared";

/** 组装 NodeSpec 对象 */
function assemblyNodeSpec(props: ExtensionNode) {
  // 从传入的 props 中解构出需要的属性和方法
  const { attrs, groups = [], parseHTML, renderHTML, ...others } = props;

  return {
    // 合并默认的 id 属性和传入的 attrs 属性
    attrs: {
      id: { default: Math.random(), setAttribute: true },
      ...attrs,
    },
    // 合并默认的 group 属性和传入的 group 属性
    group: joinListValue(groups),
    // 设置渲染节点的方法
    toDOM: renderHTML,
    // 设置解析 HTML 的方法，使用可选链操作符确保 parseHTML 存在并且是一个函数
    parseDOM: parseHTML?.(),
    getTypename: (node: Node) => node.type.name,
    // 将其他属性和方法合并到 NodeSpec 对象中
    ...others,
  };
}

/**
 * `NodeFactory`节点工厂类，用于生成不同类型节点的规范配置信息。
 */
export class NodeFactory {
  /**
   * 创建一个内联节点。
   */
  static Inline(props: ExtensionNode) {
    return assemblyNodeSpec({
      ...props,
      inline: true,
      groups: [GroupSpecEnum.Inline],
    });
  }

  /**
   * 创建一个块级节点。
   */
  static Block(props: ExtensionNode) {
    return assemblyNodeSpec({
      ...props,
      groups: [GroupSpecEnum.Block],
    });
  }

  /**
   * 创建一个叶子块级节点。
   */
  static LeafBlock(props: ExtensionNode) {
    return assemblyNodeSpec({
      ...props,
      groups: [GroupSpecEnum.Block, GroupSpecEnum.Leaf],
    });
  }

  /**
   * 创建一个文本块节点。
   */
  static TextBlock(props: ExtensionNode) {
    return assemblyNodeSpec({
      ...props,
      groups: [GroupSpecEnum.Block, GroupSpecEnum.TextBlock],
      content: `${GroupSpecEnum.Inline}*`,
    });
  }

  /**
   * 创建一个基础文本块节点。
   */
  static BasicTextBlock(props: ExtensionNode) {
    return assemblyNodeSpec({
      ...props,
      attrs: {
        align: { default: AlignTypeEnum.Left, setAttribute: true },
        indent: { default: 0, setAttribute: true },
        ...props.attrs,
      },
      groups: [GroupSpecEnum.Block, GroupSpecEnum.BasicTextBlock],
      content: `${GroupSpecEnum.Inline}*`,
    });
  }
}

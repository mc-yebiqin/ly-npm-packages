import {
  Mark,
  Node,
  NodeSpec,
  MarkSpec,
  ParseRule,
  AttributeSpec,
  DOMOutputSpec,
} from "prosemirror-model";
import { EditorView } from "prosemirror-view";

import {
  AttrsSpec,
  MarkTypeEnum,
  NodeTypeEnum,
  GroupSpecEnum,
  KeymapCommand,
} from "@ly/prosemirror";

/**
 * 定义了扩展节点的接口，继承自Prosemirror的NodeSpec接口。
 *
 * @interface ExtensionNode
 * @extends {NodeSpec}
 */
export interface ExtensionNode extends NodeSpec {
  /**
   *【必填】节点类型的唯一标识符，使用 NodeTypeEnum 中的枚举值。
   *
   * @type {NodeTypeEnum}
   */
  key: NodeTypeEnum;

  /**
   *【必填】自定义的 HTML 解析规则，用于将特定HTML标签转换为该节点的 Prosemirror 表示。
   *
   * @type {() => ParseRule[]}
   */
  parseHTML: () => ParseRule[];

  /**
   *【必填】定义该类型节点的默认序列化方式到 DOM/HTML 的规则。
   *
   * @type {(node: Node) => DOMOutputSpec}
   */
  renderHTML: (node: Node) => DOMOutputSpec;

  /**
   * 节点的属性定义，包含各种属性名称及其类型的映射。
   *
   * @type {{ [name: string]: AttrsSpec }}
   */
  attrs?: {
    [name: string]: AttrsSpec;
  };

  /**
   * 节点所属的分组，用于组织和分类不同类型的节点。
   *
   * @type {GroupSpecEnum[]}
   */
  group?: GroupSpecEnum[];

  /**
   * 节点在键盘快捷键映射中的配置，用于定义节点相关的键盘快捷键。
   *
   * @type {KeymapCommand}
   */
  keyboard?: KeymapCommand;

  /**
   * 自定义节点的渲染视图处理函数，用于将该节点渲染为编辑器中的可视元素。
   *
   * @type {(node: Node, view: EditorView, getPos: () => number) => any}
   */
  renderView?: (node: Node, view: EditorView, getPos: () => number) => any;

  /**
   * 获取节点类型名称的函数，用于在编辑器中唯一标识不同类型的节点。
   *
   * @type {(node: Node) => string}
   */
  getTypename?: (node: Node) => string;
}

/**
 * 定义了扩展标记的接口，继承自 Prosemirror 的 MarkSpec 接口。
 *
 * @interface ExtensionMark
 * @extends {MarkSpec}
 */
export interface ExtensionMark extends MarkSpec {
  /**
   * 标记类型的唯一标识符，使用 MarkTypeEnum 中的枚举值。
   *
   * @type {MarkTypeEnum}
   */
  key: MarkTypeEnum;

  /**
   * 该类型标记所获得的属性。
   */
  attrs?: {
    [name: string]: AttributeSpec;
  };

  /**
   *  将 DOM 解析器信息与此标记相关联
   */
  parseHTML?: () => ParseRule[];

  /**
   * 定义该类型节点的默认序列化方式到 DOM/HTML。
   */
  renderHTML?: (mark: Mark, inline: boolean) => DOMOutputSpec;
}

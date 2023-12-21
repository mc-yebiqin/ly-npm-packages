import { Node } from "prosemirror-model";

import { ListTypeEnum, NodeTypeEnum } from "../../shared";
import { ListItem, TemplateNodeView, NodeFactory } from "../../core";

export const list_item = NodeFactory.BasicTextBlock({
  key: NodeTypeEnum.ListItem,
  attrs: {
    type: { default: ListTypeEnum.Unordered, setAttribute: true },
    reset: { default: false, setAttribute: true },
  },
  parseHTML: () => [{ tag: "li" }],
  renderHTML: () => ["li", 0],
  renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos, ListItem),
  getTypename: (node: Node) => `${NodeTypeEnum.ListItem}_${node.attrs.type}`,
});

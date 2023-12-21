import { Node } from "prosemirror-model";

import { NodeTypeEnum } from "../../shared";
import { Heading, TemplateNodeView, NodeFactory } from "../../core";

export const heading = NodeFactory.BasicTextBlock({
  key: NodeTypeEnum.Heading,
  attrs: {
    level: { default: 1, setAttribute: true },
  },
  parseHTML: () => [
    { tag: "h1", attrs: { level: 1 } },
    { tag: "h2", attrs: { level: 2 } },
    { tag: "h3", attrs: { level: 3 } },
    { tag: "h4", attrs: { level: 4 } },
    { tag: "h5", attrs: { level: 5 } },
    { tag: "h6", attrs: { level: 6 } },
  ],
  renderHTML: (node) => [`h${node.attrs.level}`, 0],
  renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos, Heading),
  getTypename: (node: Node) => `${NodeTypeEnum.Heading}_${node.attrs.level}`,
});

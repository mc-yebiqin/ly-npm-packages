import { NodeTypeEnum } from "../../shared";
import { Paragraph, TemplateNodeView, NodeFactory } from "../../core";

export const paragraph = NodeFactory.BasicTextBlock({
  key: NodeTypeEnum.Paragraph,
  draggable: true,
  parseHTML: () => [{ tag: "p" }],
  renderHTML: () => ["p", 0],
  renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos, Paragraph),
});

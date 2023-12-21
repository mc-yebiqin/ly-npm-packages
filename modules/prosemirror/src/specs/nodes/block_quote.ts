import { NodeTypeEnum } from "../../shared";
import { Blockquote, TemplateNodeView, NodeFactory } from "../../core";

export const block_quote = NodeFactory.TextBlock({
  key: NodeTypeEnum.BlockQuote,
  parseHTML: () => [{ tag: "blockquote" }],
  renderHTML: () => ["blockquote", 0],
  renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos, Blockquote),
});

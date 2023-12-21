import { NodeTypeEnum } from "../../shared";
import { BlockCode, TemplateNodeView, NodeFactory } from "../../core";

export const block_code = NodeFactory.TextBlock({
  key: NodeTypeEnum.BlockCode,
  code: true,
  marks: "",
  defining: true,
  parseHTML: () => [{ tag: "pre", preserveWhitespace: "full" }],
  renderHTML: () => ["blockquote", 0],
  renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos, BlockCode),
});

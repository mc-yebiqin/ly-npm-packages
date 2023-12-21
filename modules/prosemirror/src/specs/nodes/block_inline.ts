import { NodeTypeEnum } from "../../shared";
import { GraphicItem, TemplateNodeView, NodeFactory } from "../../core";

export const block_inline = NodeFactory.TextBlock({
  key: NodeTypeEnum.BlockInline,
  atom: true,
  isolating: true,
  parseHTML: () => [
    {
      tag: `div[type="${NodeTypeEnum.BlockInline}"]`,
    },
  ],
  renderHTML: () => ["div", { type: NodeTypeEnum.BlockInline }, 0],
  // renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos),
});

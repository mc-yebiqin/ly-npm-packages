import { NodeTypeEnum } from "../../shared";
import { GraphicItem, TemplateNodeView, NodeFactory } from "../../core";

export const graphic = NodeFactory.LeafBlock({
  key: NodeTypeEnum.Graphic,
  attrs: {
    graphic_id: { default: "test" },
  },
  parseHTML: () => [{ tag: `div[type="${NodeTypeEnum.Graphic}"]` }],
  renderHTML: () => ["div", { type: NodeTypeEnum.Graphic }],
  renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos, GraphicItem),
});

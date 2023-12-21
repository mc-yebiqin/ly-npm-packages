import { NodeTypeEnum } from "../../shared";
import { ActionItem, TemplateNodeView, NodeFactory } from "../../core";

export const action_item = NodeFactory.BasicTextBlock({
  key: NodeTypeEnum.ActionItem,
  attrs: {
    isChecked: { default: false },
  },
  parseHTML: () => [{ tag: "input[type='radio']" }],
  renderHTML: () => ["input[type='radio']", 0],
  renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos, ActionItem),
});

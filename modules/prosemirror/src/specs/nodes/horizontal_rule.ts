import { NodeFactory } from "../../core";
import { NodeTypeEnum } from "../../shared";

export const horizontal_rule = NodeFactory.LeafBlock({
  key: NodeTypeEnum.HorizontalRule,
  parseHTML: () => [{ tag: "hr" }],
  renderHTML: () => ["hr"],
});

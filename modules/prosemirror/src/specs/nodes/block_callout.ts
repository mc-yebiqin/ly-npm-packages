import { NodeFactory } from "../../core";
import { NodeTypeEnum } from "../../shared";

export const block_callout = NodeFactory.TextBlock({
  key: NodeTypeEnum.BlockCallout,
  parseHTML: () => [{ tag: "div" }],
  renderHTML: () => ["div", 0],
});

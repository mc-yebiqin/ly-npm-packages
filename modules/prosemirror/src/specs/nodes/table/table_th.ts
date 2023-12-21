import { NodeFactory } from "../../../core";
import { NodeTypeEnum } from "../../../shared";

export const table_th = NodeFactory.TextBlock({
  key: NodeTypeEnum.TableTh,
  isolating: true,
  parseHTML: () => [{ tag: "th" }],
  renderHTML: (node) => ["th", 0],
});

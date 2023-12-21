import { NodeFactory } from "../../../core";
import { NodeTypeEnum } from "../../../shared";

export const table_tr = NodeFactory.Block({
  key: NodeTypeEnum.TableTr,
  content: `(${NodeTypeEnum.TableTh} | ${NodeTypeEnum.TableTd})*`,
  parseHTML: () => [{ tag: "tr" }],
  renderHTML: (node) => ["tr", 0],
});

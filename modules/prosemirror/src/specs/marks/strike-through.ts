import { MarkFactory } from "../../core";
import { MarkTypeEnum } from "../../shared";

/** 删除线 */
export const strike_through = MarkFactory.create({
  key: MarkTypeEnum.Strikethrough,
  parseHTML: () => [{ tag: "s" }, { tag: "del" }, { tag: "strike" }],
  renderHTML: (node) => ["del", 0],
});

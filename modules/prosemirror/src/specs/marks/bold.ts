import { MarkFactory } from "../../core";
import { MarkTypeEnum } from "../../shared";

/** 字体加粗 */
export const bold = MarkFactory.create({
  key: MarkTypeEnum.Bold,
  parseHTML: () => [{ tag: "strong" }, { tag: "b" }],
  renderHTML: () => ["strong", 0],
});

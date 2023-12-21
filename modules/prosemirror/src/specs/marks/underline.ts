import { MarkFactory } from "../../core";
import { MarkTypeEnum } from "../../shared";

/** 下划线 */
export const underline = MarkFactory.create({
  key: MarkTypeEnum.Underline,
  parseHTML: () => [{ tag: "u" }],
  renderHTML: (node) => ["u", 0],
});

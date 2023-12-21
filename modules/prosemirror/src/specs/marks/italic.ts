import { MarkFactory } from "../../core";
import { MarkTypeEnum } from "../../shared";

/** 斜体 */
export const italic = MarkFactory.create({
  key:MarkTypeEnum.Italic,
  parseHTML: () => [{ tag: "i" }, { tag: "em" }],
  renderHTML: (node) => ["i", 0],
});

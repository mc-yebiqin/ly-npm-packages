import { MarkFactory } from "../../core";
import { MarkTypeEnum } from "../../shared";

/** 字体加粗 */
export const code = MarkFactory.create({
  key: MarkTypeEnum.Code,
  parseHTML: () => [{ tag: "code" }],
  renderHTML: () => ["code", 0],
});

import { MarkFactory } from "../../core";
import { MarkTypeEnum } from "../../shared";

/** 超链接 */
export const link = MarkFactory.create({
  key:MarkTypeEnum.Link,
  attrs: {
    href: { default: null },
  },
  parseHTML: () => [
    {
      tag: "a",
      getAttrs: (node) => {
        return { href: node.getAttribute?.("href") ?? "" };
      },
    },
  ],
  renderHTML: (node) => ["a", { href: node.attrs.href }],
});

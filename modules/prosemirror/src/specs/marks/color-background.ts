import { MarkFactory } from "../../core";
import { MarkTypeEnum } from "../../shared";

/** 背景色文本标记 */
export const color_background = MarkFactory.create({
  key: MarkTypeEnum.ColorBackground,
  attrs: {
    color: { default: "" },
  },
  parseHTML: () => [
    {
      tag: "span.background_mark",
      getAttrs(node) {
        return { color: node.style?.backgroundColor ?? "" };
      },
    },
  ],
  renderHTML: (mark) => {
    return [
      "span",
      {
        class: "background_mark",
        style: `background-color: ${mark.attrs.color}`,
      },
      0,
    ];
  },
});

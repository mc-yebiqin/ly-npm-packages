import { MarkFactory } from "../../core";
import { MarkTypeEnum } from "../../shared";

/** 字体色文本标记 */
export const color_font = MarkFactory.create({
  key: MarkTypeEnum.ColorFont,
  attrs: {
    color: { default: "" },
  },
  parseHTML: () => [
    {
      tag: "span.font_mark",
      getAttrs(node) {
        return { color: node.style?.color ?? "" };
      },
    },
  ],
  renderHTML: (mark) => {
    return [
      "span",
      {
        class: "font_mark",
        style: `color: ${mark.attrs.color}`,
      },
      0,
    ];
  },
});

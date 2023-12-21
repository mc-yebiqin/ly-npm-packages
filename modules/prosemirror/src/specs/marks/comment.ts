import { MarkFactory } from "../../core";
import { MarkTypeEnum } from "../../shared";

/** 评论标记 */
export const comment = MarkFactory.create({
  key: MarkTypeEnum.Comment,
  attrs: {
    id: { default: "" },
  },
  parseHTML: () => [
    {
      tag: "span.comment_mark",
      getAttrs: (node) => {
        const findResult = node.id;
        return findResult ? { id: findResult } : false;
      },
    },
  ],
  renderHTML: (mark) => {
    return [
      "span",
      {
        id: mark.attrs.id,
        class: "comment_mark",
      },
      0,
    ];
  },
});

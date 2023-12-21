import { NodeTypeEnum } from "../../shared";
import { ImageItem, TemplateNodeView, NodeFactory } from "../../core";

export const image_item = NodeFactory.LeafBlock({
  key: NodeTypeEnum.ImageItem,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null },
  },
  draggable: false,
  parseHTML: () => [
    {
      tag: "img[src]",
      getAttrs: (dom: any) => ({
        src: dom.getAttribute?.("src"),
        alt: dom.getAttribute?.("alt"),
        title: dom.getAttribute?.("title"),
      }),
    },
  ],
  renderHTML: () => ["img"],
  renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos, ImageItem),
});

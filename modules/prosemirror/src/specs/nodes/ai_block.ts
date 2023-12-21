import { GroupSpecEnum, NodeTypeEnum } from "../../shared";
import { AIBlock, NodeFactory, TemplateNodeView } from "../../core";

export const ai_block = NodeFactory.Block({
  key: NodeTypeEnum.AI_Block,
  attrs: {
    title: { default: "" },
    content: { default: "" },
    task_id: { default: "" },
    prompt_id: { default: "" },
    generate_time: { default: Date.now() },
  },
  content: `${GroupSpecEnum.BasicTextBlock}*`,
  draggable: true,
  parseHTML: () => [{ tag: `div[type='${NodeTypeEnum.AI_Block}']` }],
  renderHTML: () => ["div", { type: NodeTypeEnum.AI_Block }, 0],
  renderView: (node, view, getPos) => new TemplateNodeView(node, view, getPos, AIBlock),
});

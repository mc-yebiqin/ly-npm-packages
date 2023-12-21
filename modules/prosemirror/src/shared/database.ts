import { AlignTypeEnum, ListTypeEnum, MarkTypeEnum, NodeTypeEnum } from "./enum";

export const NodeIconMap = {
  [NodeTypeEnum.Graphic]: "绘图节点",
  [NodeTypeEnum.Paragraph]: "段落",
  [NodeTypeEnum.BlockCode]: "代码块",
  [NodeTypeEnum.ActionItem]: "事项",
  [NodeTypeEnum.BlockQuote]: "引用节点",
  [`${NodeTypeEnum.Heading}_1`]: "标题1",
  [`${NodeTypeEnum.Heading}_2`]: "标题2",
  [`${NodeTypeEnum.Heading}_3`]: "标题3",
  [`${NodeTypeEnum.ListItem}_${ListTypeEnum.Ordered}`]: "有序",
  [`${NodeTypeEnum.ListItem}_${ListTypeEnum.Unordered}`]: "无序",
};

export const MarkIconMap = {
  [MarkTypeEnum.Bold]: "加粗",
  [MarkTypeEnum.Code]: "代码行",
  [MarkTypeEnum.Link]: "链接",
  [MarkTypeEnum.Italic]: "斜体",
  [MarkTypeEnum.Underline]: "下划线",
  [MarkTypeEnum.Strikethrough]: "删除线",
};

export const AlignIconMap = {
  [AlignTypeEnum.Left]: "左齐图标",
  [AlignTypeEnum.Center]: "居中图标",
  [AlignTypeEnum.Right]: "右齐图标",
};

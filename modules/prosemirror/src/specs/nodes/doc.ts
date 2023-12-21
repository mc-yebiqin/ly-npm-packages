import { GroupSpecEnum, NodeTypeEnum } from "../../shared";

// 文档内容承载容器节点、文本节点
export const documentDoc = {
  key: NodeTypeEnum.Doc,
  content: `${GroupSpecEnum.Block}+`,
};

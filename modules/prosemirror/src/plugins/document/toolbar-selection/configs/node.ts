import {
  NodeIconMap,
  ACTION_COMMAND,
  HEADING_COMMAND,
  ORDERED_COMMAND,
  GRAPHIC_COMMAND,
  PARAGRAPH_COMMAND,
  UNORDERED_COMMAND,
} from "@ly/prosemirror";

import { NodeActionList } from "../typescript";

export const getNodeActionGroup = () => {
  const list: NodeActionList[] = [
    [
      {
        icon: NodeIconMap.paragraph,
        label: "正文",
        command: PARAGRAPH_COMMAND,
      },
      {
        icon: NodeIconMap.heading_1,
        label: "一级标题",
        command: HEADING_COMMAND.Heading1,
      },
      {
        icon: NodeIconMap.heading_2,
        label: "二级标题",
        command: HEADING_COMMAND.Heading2,
      },
      {
        icon: NodeIconMap.heading_3,
        label: "三级标题",
        command: HEADING_COMMAND.Heading3,
      },
      {
        icon: NodeIconMap.list_item_ordered,
        label: "有序列表",
        command: ORDERED_COMMAND,
      },
      {
        icon: NodeIconMap.list_item_unordered,
        label: "无序列表",
        command: UNORDERED_COMMAND,
      },
      {
        icon: NodeIconMap.action_item,
        label: "事务列表",
        command: ACTION_COMMAND,
      },
    ],
  ];

  return list;
};

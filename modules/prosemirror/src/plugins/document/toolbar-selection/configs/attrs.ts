import { NodeActionList } from "../typescript";

import { ALIGN_ATTRS_COMMAND, AlignIconMap } from "@ly/prosemirror";

export const getAlignList = () => {
  const list: NodeActionList = [
    {
      icon: AlignIconMap.left,
      label: "左对齐",
      command: ALIGN_ATTRS_COMMAND.Left,
    },
    {
      icon: AlignIconMap.center,
      label: "居中对齐",
      command: ALIGN_ATTRS_COMMAND.Center,
    },
    {
      icon: AlignIconMap.right,
      label: "右对齐",
      command: ALIGN_ATTRS_COMMAND.Right,
    },
  ];

  return list;
};

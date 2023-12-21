import { MarkAction } from "../typescript";
import { MARK_TOGGLE_COMMAND, MarkIconMap } from "@ly/prosemirror";

export const getMarkActionList = () => {
  const list: MarkAction[] = [
    {
      icon: MarkIconMap.bold,
      command: MARK_TOGGLE_COMMAND.Bold,
    },
    {
      icon: MarkIconMap.strike_through,
      command: MARK_TOGGLE_COMMAND.Strikethrough,
    },
    {
      icon: MarkIconMap.italic,
      command: MARK_TOGGLE_COMMAND.Italic,
    },
    {
      icon: MarkIconMap.underline,
      command: MARK_TOGGLE_COMMAND.Underline,
    },
    {
      icon: MarkIconMap.code,
      command: MARK_TOGGLE_COMMAND.Code,
    },
  ];

  return list;
};

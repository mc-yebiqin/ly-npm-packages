import { UICommand } from "@ly/prosemirror";

export type NodeActionList = ActionItem[];

export type ActionItem = {
  icon: any;
  label: string;
  command: UICommand;
};

export type MarkAction = {
  icon: any;
  command: UICommand;
};

export type ColorAction = {
  type: string;
  value: string;
};

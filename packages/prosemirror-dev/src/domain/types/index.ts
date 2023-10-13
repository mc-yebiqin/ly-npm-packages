import { Node } from "prosemirror-model";
import { EditorState } from "prosemirror-state";

import { ViewTool } from "../../types";

export type ToolSlotFn = (props: ToolSlotProps) => JSX.Element;

export type ToolSlotProps = {};

export interface DomainState {
  slot: ToolSlotFn | undefined;
  view: ViewTool | null;
  views: ViewTool[];
  isOpen: boolean;
  activeTab: number;
  colorsMap: Map<string, string>;
  selectNode: Node | null;
  updateState: EditorState | null;
}

import { Node } from "prosemirror-model";
import { Command } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export interface NodeViewProps {
  node: Node;
  view: EditorView;
  getPos: () => number;
}

export interface KeymapCommand {
  [key: string]: Command;
}

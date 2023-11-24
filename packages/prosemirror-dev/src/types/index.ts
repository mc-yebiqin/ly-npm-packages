import { EditorView } from "prosemirror-view";

export interface ViewTool extends EditorView {
  id: string;
}

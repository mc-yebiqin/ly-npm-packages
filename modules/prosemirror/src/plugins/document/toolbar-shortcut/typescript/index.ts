import { EditorView } from "prosemirror-view";

export interface ShortcutList {
  label: string;
  options: ShortcutOption[];
}

export interface ShortcutOption {
  id: string;
  title: string;
  subtext: string;
  execute: (view: EditorView, clear?: boolean) => void;
  shortcut?: string;
}

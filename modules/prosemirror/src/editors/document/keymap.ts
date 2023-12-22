import { registerKeyboardShortcuts } from "@ly/prosemirror";
import { redo, undo } from "prosemirror-history";

export const initDocumentKeymap = () => {
  return registerKeyboardShortcuts({
    "Mod-y": redo,
    "Mod-z": undo,
    "Shift-Mod-Z": redo,
  });
};

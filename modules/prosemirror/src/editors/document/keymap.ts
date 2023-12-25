import { INDENT_COMMAND, registerKeyboardShortcuts } from "@ly/prosemirror";
import { redo, undo } from "prosemirror-history";

export const initDocumentKeymap = () => {
  return registerKeyboardShortcuts({
    Tab: INDENT_COMMAND.increase.execute,
    "Mod-y": redo,
    "Mod-z": undo,
    "Shift-Tab": INDENT_COMMAND.decrease.execute,
    "Shift-Mod-Z": redo,
  });
};

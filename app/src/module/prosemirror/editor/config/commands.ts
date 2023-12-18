import { Command } from "prosemirror-state";

type KeymapCommand = { [key: string]: Command };
export function getTranscribeKeymap(): KeymapCommand {
  const deleteSelection: Command = (state, dispatch) => {
    if (dispatch) {
      const { empty } = state.selection;
      if (!empty) {
        dispatch(state.tr.deleteSelection());
        return true;
      }
    }
    return false;
  };

  const keymap = {
    Backspace: deleteSelection,
  };

  return keymap;
}

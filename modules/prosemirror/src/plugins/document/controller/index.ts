import { Plugin, TextSelection } from "prosemirror-state";
import { documentDomain } from "@ly/prosemirror";

export const documentController = (): Plugin => {
  const pluginObj = new Plugin({
    view(view: any) {
      documentDomain.getState().initEditorView(view);
      return {
        update({ state }) {
          documentDomain.getState().updateEditorState(state);
        },
      };
    },
    props: {
      handleDOMEvents: {
        blur(view) {
          const { state, dispatch } = view;
          const { tr, doc, selection } = state;
          dispatch(tr.setSelection(TextSelection.create(doc, selection.head)));
        },
      },
    },
  });

  return pluginObj;
};

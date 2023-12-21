import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { StateCreator } from 'zustand';

interface PMEditorState {
  editorView: EditorView | null;
  editorState: EditorState | null;
}

const initEditorState = (): PMEditorState => ({
  editorView: null,
  editorState: null,
});

export interface EditorSlice extends PMEditorState {
  initEditorView: (view: EditorView) => void;
  updateEditorState: (state: EditorState) => void;
  destroyEditorSlice: () => void;
}

export const createEditorSlice: StateCreator<EditorSlice> = (set, get) => ({
  ...initEditorState(),
  initEditorView: (newEditorView) => {
    get().editorView?.destroy?.();
    set({ editorView: newEditorView });
  },
  updateEditorState: (newEditorState) => {
    set({ editorState: newEditorState });
  },
  destroyEditorSlice: () => {
    get().editorView?.destroy?.();
    set({ ...initEditorState() });
  },
});

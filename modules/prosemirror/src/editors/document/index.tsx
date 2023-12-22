import React, { HTMLAttributes, memo, useRef } from "react";
import { history } from "prosemirror-history";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { useMemoizedFn, useMount, useUnmount } from "ahooks";
import applyDevTools from "prosemirror-dev-tools";

// import initMockData from "./tests/doc.mock";
import initMockData from "./tests/init.mock";
// import textMock from "./tests/document.mock";
import initDocumentSchema from "./schema";

import {
  PMStyles,
  assembleNodeViews,
  commonDraggerPlugin,
  commonKeymapPlugin,
  commonUIInteractionPlugin,
  documentController,
  documentDomain,
} from "@ly/prosemirror";
import { initDocumentKeymap } from "./keymap";

interface EditorProps extends HTMLAttributes<HTMLDivElement> {}

export const DocumentEditor = memo((props: EditorProps) => {
  const { children } = props;

  const mountedRef = useRef<HTMLDivElement>(null);
  const unmountedTool = useRef<any>(null);

  /** 创建编辑器视图 */
  const createEditorView = useMemoizedFn((doc: any) => {
    const schema = initDocumentSchema();

    const editorState = EditorState.create({
      doc: schema.nodeFromJSON(doc),
      schema: schema,
      plugins: [
        history(),
        commonKeymapPlugin(initDocumentKeymap()),
        commonDraggerPlugin(),
        commonUIInteractionPlugin(),
        documentController(),
      ],
    });

    const editorView = new EditorView(mountedRef.current, {
      state: editorState,
      attributes: {
        class: PMStyles.document_editor,
      },
      nodeViews: assembleNodeViews(schema),
      dispatchTransaction: (tr) => {
        editorView.updateState(editorView.state.apply(tr));
      },
    });

    unmountedTool.current = applyDevTools(editorView);
  });

  useMount(() => {
    const mockData = initMockData();
    createEditorView(mockData);
  });

  useUnmount(() => {
    unmountedTool?.current?.();
    documentDomain.getState()?.destroyDocument?.();
  });

  return (
    <div className={PMStyles.document_mounted} ref={mountedRef}>
      {children}
    </div>
  );
});

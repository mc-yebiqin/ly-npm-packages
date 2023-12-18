"use client";
import React, { HTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { initDeveloperTools } from "laoye-prosemirror-dev";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import initNotepadMock from "./mock";
import { initDocumentSchema } from "./config";
import { PMStyles } from "../styles";

export const subscribeViewDevtool = initDeveloperTools();

interface EditorProps extends HTMLAttributes<HTMLDivElement> {}

export const DocumentEditor = (props: EditorProps) => {
  const { children } = props;

  const editorRef = useRef<any>();
  const [editorView, setEditorView] = useState<EditorView>();

  const createEditorView = useCallback((doc: any) => {
    const schema = initDocumentSchema();

    // 初始化编辑器状态
    const editorState = EditorState.create({
      doc: schema.nodeFromJSON(doc),
      schema,
    });

    // 创建编辑器视图
    const editorView = new EditorView(editorRef.current, {
      state: editorState,
      attributes: {
        class: PMStyles.document_editor,
      },
      dispatchTransaction(transaction) {
        if (!editorView) return null;
        editorView.updateState(editorView.state.apply(transaction));
      },
    });

    setEditorView(editorView);
    subscribeViewDevtool(editorView);
  }, []);

  useEffect(() => {
    createEditorView(initNotepadMock);
    return () => editorView?.destroy();
  }, []);

  return <div ref={editorRef}>{children}</div>;
};

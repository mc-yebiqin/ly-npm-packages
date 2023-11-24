"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { initDeveloperTools } from "laoye-prosemirror-dev";

// 引入prosemirror模块
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";

import mockDoc from "./tests/document.mock";

// 引入自定义的功能组件
import { initDocumentSchema } from "./configs";

export const subscribeViewDevtool = initDeveloperTools();

export const EditorDemo = () => {
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
      dispatchTransaction: (transaction) => {
        editorView?.updateState(editorView?.state.apply(transaction));
      },
    });

    setEditorView(editorView);
    subscribeViewDevtool(editorView);
  }, []);

  useEffect(() => {
    createEditorView(mockDoc || {});
    return () => {
      editorView?.destroy();
    };
  }, []);

  return <div ref={editorRef} />;
};

"use client";
import React from "react";
import classNames from "classnames";
import { EditorView } from "prosemirror-view";
import { TextSelection } from "prosemirror-state";

import { PMStyles, SLASH_SHORTCUT_META } from "@ly/prosemirror";

type NodeHandlerProps = {
  view: EditorView;
  getPos: () => number;
};
const NodeHandler = ({ view, getPos }: NodeHandlerProps) => {
  const handleInsertCommand = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const pos = getPos();
    const { state, dispatch } = view;
    // 插入内容
    let tr = state.tr.insertText("/", pos + 1);
    // 修正选区
    tr = tr.setSelection(TextSelection.create(tr.doc, pos + 2));
    // 添加命令标记
    dispatch(tr.setMeta(SLASH_SHORTCUT_META, { type: "create" }));
  };

  const handleDraggerCommand = () => {
    const pos = getPos();
    const { state, dispatch } = view;
    const { tr, doc } = state;
    dispatch(tr.setSelection(TextSelection.create(doc, pos + 1)));
  };

  return (
    <div className={PMStyles.handle_container}>
      <div
        className={classNames(PMStyles.handle_item, PMStyles.handle_dragger)}
        onClick={handleDraggerCommand}
      >
        拖
      </div>

      <div
        className={classNames(PMStyles.handle_item, PMStyles.handle_creator)}
        onClick={handleInsertCommand}
      >
        插
      </div>
    </div>
  );
};

export default NodeHandler;

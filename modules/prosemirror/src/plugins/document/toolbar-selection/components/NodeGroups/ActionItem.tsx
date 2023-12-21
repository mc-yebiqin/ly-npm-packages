import React, { memo } from "react";

import styles from "./index.module.scss";

import { documentEditorDomain, useDocumentEditorDomain } from "@notta/domain";

type ActionProps = {
  item: any;
};
const ActionItem = ({ item }: ActionProps) => {
  const { icon, label, command } = item;

  const editorState = useDocumentEditorDomain((state) => state.editorState);

  const handleExecuteItem = () => {
    const { editorView } = documentEditorDomain.getState();
    if (editorView) command.execute(editorView);
  };

  return (
    <div
      className={styles.node_action}
      data-active={command.isActive(editorState)}
      onMouseDown={handleExecuteItem}
    >
      <div className={styles.node_icon}>{icon}</div>
      <div className={styles.node_label}>{label}</div>
    </div>
  );
};

export default memo(ActionItem);

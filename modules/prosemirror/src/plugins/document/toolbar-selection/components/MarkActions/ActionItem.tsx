import React, { memo } from "react";

import styles from "./index.module.scss";

import { documentEditorDomain, useDocumentEditorDomain } from "@notta/domain";
import ActionButton from "../ActionButton";

type ActionProps = {
  item: any;
};
const ActionItem = ({ item }: ActionProps) => {
  const { icon, command } = item;

  const editorState = useDocumentEditorDomain((state) => state.editorState);

  const handleExecuteItem = () => {
    const { editorView } = documentEditorDomain.getState();
    if (editorView) command.execute(editorView);
  };

  return (
    <ActionButton
      data-active={command.isActive(editorState)}
      onMouseDown={handleExecuteItem}
    >
      <div clasName={styles.action_icon}>{icon}</div>
    </ActionButton>
  );
};

export default memo(ActionItem);

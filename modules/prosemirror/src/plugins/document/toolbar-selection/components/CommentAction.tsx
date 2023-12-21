import React, { memo } from "react";

import ActionButton from "./ActionButton";

import { documentEditorDomain } from "@notta/domain";
import { COMMENT_COMMAND } from "@ly/prosemirror";

type CommentActionProps = {};
const CommentAction = (props: CommentActionProps) => {
  const handleClick = () => {
    const { editorView } = documentEditorDomain.getState();
    if (editorView) COMMENT_COMMAND.execute(editorView);
  };

  return (
    <ActionButton onClick={handleClick}>
      <div>评论</div>
    </ActionButton>
  );
};

export default memo(CommentAction);

import React, { memo } from "react";
import { MARK_TOGGLE_COMMAND, BackgroundColorEnum } from "@ly/prosemirror";
import styles from "../index.module.scss";
import { documentEditorDomain } from "@notta/domain";

const BackgroundColor = () => {
  const handleClickEvt = (color: string) => {
    return () => {
      const { editorView } = documentEditorDomain.getState();
      if (editorView) MARK_TOGGLE_COMMAND.ColorBackground.execute(editorView, { color });
    };
  };

  return (
    <div className={styles.color_group}>
      <div className={styles.group_title}>背景色</div>

      <div className={styles.group_actions} data-group="background">
        {Object.entries(BackgroundColorEnum).map(([_, type]) => (
          <div
            key={type}
            style={{ borderColor: type, backgroundColor: type }}
            className={styles.color_action}
            onMouseDown={handleClickEvt(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(BackgroundColor);

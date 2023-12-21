import { MARK_TOGGLE_COMMAND, FontColorEnum } from "@ly/prosemirror";
import React, { memo } from "react";
import styles from "../index.module.scss";
import { documentEditorDomain } from "@notta/domain";

const FontColor = () => {
  const handleClickEvt = (color: string) => {
    return () => {
      const { editorView } = documentEditorDomain.getState();
      if (editorView) MARK_TOGGLE_COMMAND.ColorFont.execute(editorView, { color });
    };
  };

  return (
    <div className={styles.color_group}>
      <div className={styles.group_title}>字体色</div>

      <div className={styles.group_actions} data-group="font">
        {Object.entries(FontColorEnum).map(([_, type]) => (
          <div
            key={type}
            style={{ color: type }}
            className={styles.color_action}
            onMouseDown={handleClickEvt(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(FontColor);

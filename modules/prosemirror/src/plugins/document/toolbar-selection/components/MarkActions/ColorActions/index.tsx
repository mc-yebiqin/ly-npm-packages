import React, { memo, useState } from "react";
import { Popover } from "antd";

import styles from "../index.module.scss";
import FontColor from "./FontColor";
import BackgroundColor from "./BackgroundColor";

import { documentEditorDomain } from "@notta/domain/src";
import { MarkTypeEnum } from "../../../../../../shared";
import ActionButton from "../../ActionButton";

const ColorTrigger = () => {
  const [open, setOpen] = useState(false);

  const handleResetColor = () => {
    const { editorView } = documentEditorDomain.getState();
    if (editorView) {
      const { state, dispatch } = editorView;
      const { schema, selection } = state;
      const { from, to } = selection;

      const fontColor = schema.marks[MarkTypeEnum.ColorFont];
      const backgroundColor = schema.marks[MarkTypeEnum.ColorBackground];

      let tr = state.tr;
      tr = tr.removeMark(from, to, fontColor);
      tr = tr.removeMark(from, to, backgroundColor);
      dispatch(tr);
    }
  };

  return (
    <Popover
      trigger={"hover"}
      placement="bottomRight"
      onOpenChange={setOpen}
      getPopupContainer={(target) => target}
      content={
        <div className={styles.color_overlay}>
          <FontColor />

          <BackgroundColor />

          <button className={styles.color_reset} onMouseDown={handleResetColor}>
            恢复默认
          </button>
        </div>
      }
    >
      <ActionButton data-active={open}>
        <div className={styles.action_icon}>颜色</div>
      </ActionButton>
    </Popover>
  );
};

export default memo(ColorTrigger);

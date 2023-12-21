import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import PMUtils from "laoye-prosemirror-utils";
import { useMemoizedFn } from "ahooks";

import styles from "./index.module.scss";
import ToolbarLayout from "./ToolbarLayout";

import { useDocumentEditorDomain } from "@notta/domain";

interface ForwardRef {
  updateVisible: (status: boolean) => void;
}

const SelectionBar = forwardRef<ForwardRef, any>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const editorView = useDocumentEditorDomain((state) => state.editorView);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const updateVisible = useMemoizedFn((status: boolean) => {
    if (status) {
      const element = containerRef.current!;
      PMUtils.calculateTargetRelativeOffset(editorView!, element).then(setOffset);
    }

    // 更新工具条的显示状态
    if (status !== visible) setVisible(status);
  });

  const handleClickEvt = useMemoizedFn((e: any) => {
    e.preventDefault();
  });

  useImperativeHandle(ref, () => ({ updateVisible }));

  return (
    <div
      ref={containerRef}
      className={styles.toolbar_container}
      data-visible={visible}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onMouseDownCapture={handleClickEvt}
    >
      {visible && <ToolbarLayout />}
    </div>
  );
});

export default SelectionBar;

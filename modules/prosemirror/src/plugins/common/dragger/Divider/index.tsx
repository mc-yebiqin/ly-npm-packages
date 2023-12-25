import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useMemoizedFn } from "ahooks";

import { Node } from "prosemirror-model";
import { PMStyles } from "@ly/prosemirror";

type DragInfo = {
  y: number;
  node: Node;
};

type ForwardRef = {
  updateVisible: (data: DragInfo | null) => void;
};

const Divider = forwardRef<ForwardRef, any>((props, ref) => {
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);

  const indentLines = (dragInfo?.node.attrs.indent ?? 0) + 1;

  const updateVisible = useMemoizedFn((data: DragInfo | null) => setDragInfo(data));

  useImperativeHandle(ref, () => ({ updateVisible }));

  return (
    <div
      className={PMStyles.dragger_divider}
      data-visible={Boolean(dragInfo)}
      style={{ transform: `translateY(${dragInfo?.y}px)` }}
    >
      {Array.from<number>({ length: indentLines }).map((_, index) => {
        return (
          <div
            key={index}
            className={PMStyles.dragger_line}
            style={{ width: "2em", opacity: (index + 1) / indentLines }}
          />
        );
      })}
    </div>
  );
});

export default Divider;

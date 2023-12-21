import { useMemoizedFn } from "ahooks";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import { PMStyles } from "@ly/prosemirror";

type OffsetInfo = {
  x: number;
  y: number;
  width: string;
};

type ForwardRef = {
  updateOffset: (data: OffsetInfo | null) => void;
};

const Divider = forwardRef<ForwardRef, any>((props, ref) => {
  const [offset, setOffset] = useState<OffsetInfo | null>(null);

  const updateOffset = useMemoizedFn((data: OffsetInfo | null) => setOffset(data));

  useImperativeHandle(ref, () => ({ updateOffset }));

  return (
    <div
      style={{
        width: offset?.width,
        display: offset ? "block" : "none",
        transform: `translate(${offset?.x}px, ${offset?.y}px)`,
      }}
      className={PMStyles.dragger_divider}
    />
  );
});
export default Divider;

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useMemoizedFn } from "ahooks";

import styles from "./index.module.scss";
import { graphicsDomain } from "@notta/domain";

export type GraphicInfo = { offsetY: number; graphicId: string } | null;
interface ForwardRef {
  updateGraphicInfo: (data: GraphicInfo) => void;
}

const GraphicToolbar = forwardRef<ForwardRef, any>((props, ref) => {
  const [offsetY, setOffsetY] = useState<number | null>(0);
  const [graphicId, setGraphicId] = useState<string | null>(null);

  const updateGraphicInfo = useMemoizedFn((data: GraphicInfo) => {
    setOffsetY(data?.offsetY ?? null);
    setGraphicId(data?.graphicId ?? null);
  });

  const handleClickEvt = useMemoizedFn((e) => {
    if (!graphicId) return;
    graphicsDomain.getState().drawingGraphic(graphicId);
  });

  useImperativeHandle(ref, () => ({ updateGraphicInfo }));

  if (!graphicId) return null;

  return (
    <div
      className={styles.toolbar_container}
      onMouseDownCapture={handleClickEvt}
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      <button onClick={handleClickEvt}>编辑</button>
    </div>
  );
});

export default GraphicToolbar;

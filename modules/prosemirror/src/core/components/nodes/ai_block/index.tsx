import { NodeViewProps, PMStyles } from "@ly/prosemirror";
import React, { forwardRef } from "react";

export const AIBlock = forwardRef<any, NodeViewProps>((props, ref) => {
  return (
    <div className={PMStyles.ai_container}>
      <div ref={ref} />
    </div>
  );
});

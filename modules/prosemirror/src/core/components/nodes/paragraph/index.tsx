import React from "react";
import { forwardRef } from "react";

export const Paragraph = forwardRef<any, any>((props, ref) => {
  return <div ref={ref} />;
});

"use client";

import React, { memo } from "react";
import { ThemeProvider } from "./src";

const theme = {
  color: {
    blue: {
      100: "#0000ff1f",
      200: "#0000ff2f",
      300: "#0000ff3f",
    },
  },
};

export const ThemeDemo = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

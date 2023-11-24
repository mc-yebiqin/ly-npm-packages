import React, { memo } from "react";

type providersProps = {
  children: React.ReactNode;
};
const ThemeProvider = (props: providersProps) => {
  return <div>this is providers component</div>;
};

export default ThemeProvider;

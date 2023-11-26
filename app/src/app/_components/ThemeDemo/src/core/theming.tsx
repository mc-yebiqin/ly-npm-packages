import React, { createContext, memo, useContext, useMemo } from "react";
import { convertToCssVars } from "../utilities";

export const ThemeContext = createContext({});

if (process.env.NODE_ENV !== "production") ThemeContext.displayName = "LaoYeThemeContext";

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = memo((props: any) => {
  const { theme, children } = props;

  const computedTheme = useMemo(() => convertToCssVars(theme), [theme]);

  return <ThemeContext.Provider value={computedTheme}>{children}</ThemeContext.Provider>;
});

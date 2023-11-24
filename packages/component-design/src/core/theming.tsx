import React, { createContext, memo, useContext } from "react";

export const ThemeContext = createContext({});

if (process.env.NODE_ENV !== "production") ThemeContext.displayName = "LaoYeThemeContext";

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = memo((props: any) => {
  let theme = useContext(ThemeContext);
  return <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>;
});

import React, { createContext, memo, useContext } from "react";

export const ThemeContext = createContext({});

if (process.env.NODE_ENV !== "production") ThemeContext.displayName = "LaoYeThemeContext";

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = memo((props: any) => {
  const { children } = props;

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
});

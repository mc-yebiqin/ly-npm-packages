import { defaultThemeSpecs } from "./specs";
import { extractCSSVars, flattenTokens } from "../utilities";

class SystemTheme {
  constructor() {
    this.updateTheme();
  }

  updateTheme(themeSpec?: any) {
    const flatTokens = flattenTokens(themeSpec ?? defaultThemeSpecs);
    console.log(
      "%c >>>>> flatTokens -14",
      "font-size:13px; background:pink; color:#000;",
      flatTokens
    );

    const { themeTokens, themeCSSVars } = extractCSSVars(flatTokens);
    console.log(
      "%c >>>>> themeTokens, themeCSSVars -17",
      "font-size:13px; background:pink; color:#000;",
      themeTokens,
      themeCSSVars
    );

    Object.assign(this, themeTokens);
  }
}

export const theme = new SystemTheme();

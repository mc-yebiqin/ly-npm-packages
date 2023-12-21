"use client";
import { defaultThemeSpecs } from "./specs";
import { flattenTokens } from "../utilities";

function camelToKebab(camelCase: string) {
  return camelCase.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function generateClassName(length = 8) {
  // CSS 类名中，开头不能以数字、特殊字符（除了连字符 - 和下划线 _）或者保留的 CSS 关键字作为有效的选择器。
  let randomClassName = "_";

  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomClassName += characters.charAt(randomIndex);
  }

  return randomClassName;
}

class SystemDesign {
  private themeStyle: HTMLElement;
  private classesStyle: HTMLElement;

  classesMap: Map<string, string> = new Map();

  constructor() {
    this.themeStyle = this.createStyleTag("theme-style");
    this.classesStyle = this.createStyleTag("classes-style");

    this.applyTheme();
  }

  applyTheme(themeSpec = defaultThemeSpecs) {
    const { themeTokens, themeCSSVars } = flattenTokens(themeSpec);
    Object.assign(this, themeCSSVars);

    // 生成样式字符串
    const styleString = Object.entries(themeTokens)
      .map(([property, value]) => `${property}: ${value};`)
      .join("\n");

    // 将样式应用到 style 标签
    this.themeStyle.textContent = `:root {\n${styleString}\n}`;
  }

  assembleClassNames = (cssObject?: any) => {
    if (!cssObject) return "";

    const classesList: string[] = [];

    Object.entries(cssObject).forEach(([cssKey, cssValue]: any) => {
      const kebabCss = camelToKebab(cssKey);
      const cacheKey = `${cssKey}_${cssValue}`;

      let className = this.classesMap.get(cacheKey);
      if (!className) {
        className = generateClassName();
        this.classesMap.set(cacheKey, className);
        this.classesStyle.appendChild(
          document.createTextNode(`.${className} { ${kebabCss}: ${cssValue}; }`)
        );
      }

      classesList.push(className);
    });

    return classesList.join(" ");
  };

  private createStyleTag(id: string) {
    const styleTag = document.createElement("style");
    styleTag.id = id;
    return document.head.appendChild(styleTag);
  }
}

export const design = new SystemDesign();
